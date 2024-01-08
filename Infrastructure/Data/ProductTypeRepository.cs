
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class ProductTypeRepository : IProductTypeRepository
{
    private readonly StoreDbContext _context;

    public ProductTypeRepository(StoreDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<ProductType>> GetProductTypesAsync()
    {
        return await _context.ProductTypes.ToListAsync();
    }

    public async Task<ProductType> GetProductTypeByIdAsync(int id)
    {
        return await _context.ProductTypes.FindAsync(id);
    }
}