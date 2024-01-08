using Domain.Entities;
using Domain.Interfaces;
using StackExchange.Redis;
using System.Text.Json;

namespace Infrastructure.Data;

public class CartRepository : ICartRepository
{
    private readonly IDatabase _database;
    public CartRepository(IConnectionMultiplexer redis)
    {
        _database = redis.GetDatabase();
    }
    public async Task<bool> DeleteCartAsync(string basketId)
    {
        return await _database.KeyDeleteAsync(basketId);
    }

    public async Task<CustomerCart> GetCartAsync(string basketId)
    {
        var data = await _database.StringGetAsync(basketId);

        return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerCart>(data);
    }

    public async Task<CustomerCart> UpdateCartAsync(CustomerCart basket)
    {
        var created = await _database.StringSetAsync(basket.Id, 
                                JsonSerializer.Serialize(basket),
                                TimeSpan.FromDays(7)
                                );

        if(!created)
        {
            return null;
        }

        return await GetCartAsync(basket.Id);
    }
}
