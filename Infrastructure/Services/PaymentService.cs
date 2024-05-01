using Domain.Entities;
using Domain.Entities.OrderAggregate;
using Domain.Interfaces;
using Domain.Specifications;
using Microsoft.Extensions.Configuration;
using Stripe;
using System.Reflection.Metadata.Ecma335;

namespace Infrastructure.Services;

public class PaymentService : IPaymentService
{
    private readonly ICartRepository _cartRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IConfiguration _config;

    public PaymentService(
        ICartRepository cartRepository, 
        IUnitOfWork unitOfWork, 
        IConfiguration config) 
    {
        _cartRepository = cartRepository;
        _unitOfWork = unitOfWork;
        _config = config;
    }

    public async Task<CustomerCart> CreateOrUpdatePaymentIntent(string cartId)
    {
        StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];
        var cart = await _cartRepository.GetCartAsync(cartId);

        if (cart is null) return null;

        var shippingPrice = 0m;

        if(cart.DeliveryMethodId.HasValue)
        {
            var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>()
                .GetByIdAsync((int)cart.DeliveryMethodId);
            shippingPrice = deliveryMethod.Price;      
        }

        foreach( var item in cart.Items ) 
        {
            var productItem = await _unitOfWork.Repository<Domain.Entities.Product>().GetByIdAsync(item.Id);
            if (item.Price != productItem.Price)
            {
                item.Price = productItem.Price;
            }
        }

        var service = new PaymentIntentService();

        PaymentIntent intent;

        if (string.IsNullOrEmpty(cart.PaymentIntentId))
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = (long)cart.Items.Sum(i => (i.Price * 100) * i.Quantity) + (long) shippingPrice*100,
                Currency = "BRL",
                PaymentMethodTypes = new List<string> { "card"}
            };

            intent = await service.CreateAsync(options);
            cart.PaymentIntentId = intent.Id;
            cart.ClientSecret = intent.ClientSecret;
        }
        else
        {
            var options = new PaymentIntentUpdateOptions
            {
                Amount = (long)cart.Items.Sum(i => (i.Price * 100) * i.Quantity) + (long)shippingPrice * 100
            };

            await service.UpdateAsync(cart.PaymentIntentId, options);
        }

        await _cartRepository.UpdateCartAsync(cart);

        return cart;
    }

    public async Task<Order> UpdateOrderForFailedPayment(string intentId)
    {
        var spec = new OrderByPaymentIntentIdSpecification(intentId);
        var order = await _unitOfWork.Repository<Order>().GetEntityWithSpecification(spec);

        if (order is null) return null;

        order.Status = Domain.Enums.OrderStatus.PaymentFailed;
        await _unitOfWork.Repository<Order>().UpdateAsync(order);
        await _unitOfWork.Complete();

        return order;
    }

    public async Task<Order> UpdateOrderForSucceededPayment(string intentId)
    {
        var spec = new OrderByPaymentIntentIdSpecification(intentId);
        var order = await _unitOfWork.Repository<Order>().GetEntityWithSpecification(spec);

        if (order is null) return null;

        order.Status = Domain.Enums.OrderStatus.PaymentReceived;
        await _unitOfWork.Repository<Order>().UpdateAsync(order);
        await _unitOfWork.Complete();

        return order;
    }
}
