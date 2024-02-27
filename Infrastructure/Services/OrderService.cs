
using Domain.Entities;
using Domain.Entities.OrderAggregate;
using Domain.Interfaces;
using Domain.Specifications;

namespace Infrastructure.Services;

public class OrderService : IOrderService
{
    private readonly ICartRepository _cartRepo;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IStockMovimentService _movimentService;

    public OrderService(ICartRepository cartRepo, IUnitOfWork unitOfWork, IStockMovimentService movimentService)
    {
        _cartRepo = cartRepo;
        _unitOfWork = unitOfWork;
        _movimentService = movimentService;
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
            
            await _movimentService.OutgoingStockMovimentService(productItem, item.Size, item.Quantity);

            var itemOrdered = new ProductItemOrdered(productItem.Id, 
                productItem.Name, productItem.PictureUrl);
            var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity, item.Size);
            items.Add(orderItem);
        }

        var dm = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);
        var subtotal = items.Sum(item => item.Price * item.Quantity);


        var order = new Order(items,buyerEmail,ShippingAddress,dm,subtotal);
        await _unitOfWork.Repository<Order>().AddAsync(order);

        var result = await _unitOfWork.Complete();


        if (result <= 0) return null;

        await _cartRepo.DeleteCartAsync(cartId);

        return order;
    }


    public async Task<string> CancelOrderAsync(int id)
    {
        var order = await _unitOfWork.Repository<Order>().GetByIdAsync(id);
        try
        {
            foreach (var item in order.OrderItems)
            {
                var prod = await _unitOfWork.Repository<Product>().GetByIdAsync(item.Id);

                if (prod == null) continue;

                await _movimentService.EntryStockMovimentService(prod, item.Size, item.Quantity);
            }

            order.Status = Domain.Enums.OrderStatus.Canceled;
            await _unitOfWork.Repository<Order>().UpdateAsync(order);
        }
        catch(Exception ex)
        {
            return ex.Message;
        }

        await _unitOfWork.Complete();

        return "The Order was canceled with success!";
            
            
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
