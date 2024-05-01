using Domain.Entities;
using Domain.Entities.OrderAggregate;

namespace Domain.Interfaces;

public interface IPaymentService
{
    Task<CustomerCart> CreateOrUpdatePaymentIntent(string cartId);
    Task<Order> UpdateOrderForSucceededPayment(string intentId);
    Task<Order> UpdateOrderForFailedPayment(string intentId);
}