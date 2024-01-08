using Domain.Entities;

namespace Domain.Interfaces;

public interface ICartRepository
{
    Task<CustomerCart> GetCartAsync(string basketId);
    Task<CustomerCart> UpdateCartAsync(CustomerCart basket);
    Task<bool> DeleteCartAsync(string basketId);
}
