
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class ProductBrandRepository : IProductBrandRepository
{
    private readonly StoreDbContext _context;

    public ProductBrandRepository(StoreDbContext context)
    {
        _context = context;
    }

    public async Task<ProductBrand> GetProductBrandByIdAsync(int id)
    {
        return await _context.ProductBrands.FindAsync(id);
    }

    public async Task<IReadOnlyList<ProductBrand>> GetProductBrands()
    {
        return await _context.ProductBrands.ToListAsync();
    }
}