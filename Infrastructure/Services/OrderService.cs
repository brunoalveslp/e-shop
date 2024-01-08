﻿
using Domain.Entities;
using Domain.Entities.OrderAggregate;
using Domain.Interfaces;
using Domain.Specifications;

namespace Infrastructure.Services;

public class OrderService : IOrderService
{
    private readonly ICartRepository _cartRepo;
    private readonly IUnitOfWork _unitOfWork;

    public OrderService(ICartRepository cartRepo, IUnitOfWork unitOfWork)
    {
        _cartRepo = cartRepo;
        _unitOfWork = unitOfWork;
    }

        
    public async Task<Order> CreateOrderAsync(string buyerEmail, 
        int deliveryMethodId, string cartId, Address ShippingAddress)
    {
        // get cart from repo
        var cart = await _cartRepo.GetCartAsync(cartId);
        // get items from products repo
        var items = new List<OrderItem>();
        foreach(var item in cart.Items)
        {
            var productItem = await _unitOfWork.Repository<Product>().GetByIdAsync(item.Id);
            var itemOrdered = new ProductItemOrdered(productItem.Id, 
                productItem.Name, productItem.PicturesUrls);
            var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
            items.Add(orderItem);
        }

        // get delivery method
        var dm = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);
        // calculate subtotal
        var subtotal = items.Sum(item => item.Price * item.Quantity);
        // create order

        var order = new Order(items,buyerEmail,ShippingAddress,dm,subtotal);
        await _unitOfWork.Repository<Order>().AddAsync(order);

        // TODO: save to db
        var result = await _unitOfWork.Complete();
        // return order

        if (result <= 0) return null;

        // delete basket
        await _cartRepo.DeleteCartAsync(cartId);

        return order;
    }

    public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
    {
        return await _unitOfWork.Repository<DeliveryMethod>().GetAllAsync();
    }

    public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
    {
        var spec = new OrdersWithItemsAndOrderingSpecification(id, buyerEmail);

        return await _unitOfWork.Repository<Order>().GetEntityWithSpecification(spec);
    }

    public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
    {
        var spec = new OrdersWithItemsAndOrderingSpecification(buyerEmail);

        return await _unitOfWork.Repository<Order>().ListAsync(spec);
    }
}
