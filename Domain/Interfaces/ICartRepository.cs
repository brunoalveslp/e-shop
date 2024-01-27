using Domain.Entities;

namespace Domain.Interfaces;

public interface ICartRepository
{
    Task<CustomerCart> GetCartAsync(string cartId);
    Task<CustomerCart> UpdateCartAsync(CustomerCart cart);
    Task<bool> DeleteCartAsync(string cartId);
}
