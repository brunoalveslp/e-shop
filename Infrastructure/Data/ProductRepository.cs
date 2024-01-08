
using Domain.Entities;
using Domain.Interfaces;
using Domain.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class ProductRepository : IProductRepository
{
    private readonly StoreDbContext _context;

    public ProductRepository(StoreDbContext context)
    {
        _context = context;
    }

    public async Task<Product> GetProductByIdAsync(int id)
    {
        return await _context.Products
                                .Include(p => p.ProductType)
                                .Include(p => p.ProductBrand)
                                .Include(p => p.ProductUnit)
                                .FirstOrDefaultAsync(p => p.Id == id);

    }

    public async Task<IReadOnlyList<Product>> GetProductsAsync()
    {
        return await _context.Products
                                .Include(p => p.ProductType)
                                .Include(p => p.ProductBrand)
                                .Include(p => p.ProductUnit)
                                .ToListAsync();
    }

    public Task<IReadOnlyList<Product>> ListAsync(ISpecification<Product> spec)
    {
        throw new NotImplementedException();
    }

    public void UpdateAsync(Product product, List<string> picturesUrls)
    {
        throw new NotImplementedException();
    }



    public Task AddAsync(Product product, List<string> picturesUrls)
    {
        throw new NotImplementedException();
    }

    public Task<int> CountAsync(ISpecification<Product> spec)
    {
        throw new NotImplementedException();
    }

    public void DeleteAsync(Product product)
    {
        throw new NotImplementedException();
    }

    public Task<Product> GetEntityWithSpecification(ISpecification<Product> spec)
    {
        throw new NotImplementedException();
    }
}