using Domain.Entities;

namespace Domain.Interfaces;

public interface IPaymentService
{
    Task<CustomerCart> CreateOrUpdatePaymentIntent(string cartId);
}
