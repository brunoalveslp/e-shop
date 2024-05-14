using Domain.Entities;
using Domain.Entities.OrderAggregate;
using Domain.Interfaces;
using Domain.Specifications;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

namespace Infrastructure.Data
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly IDbContextFactory<StoreDbContext> _contextFactory;

        public GenericRepository(IDbContextFactory<StoreDbContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }

        public async Task AddAsync(T entity)
        {
            using var context = _contextFactory.CreateDbContext();
            await context.Set<T>().AddAsync(entity);
            await context.SaveChangesAsync();
        }

        public async Task<int> CountAsync(ISpecification<T> spec)
        {
            using var context = _contextFactory.CreateDbContext();
            return await ApplySpecification(spec, context).CountAsync();
        }

        public void Delete(T entity)
        {
            using var context = _contextFactory.CreateDbContext();
            context.Set<T>().Remove(entity);
            context.SaveChanges();
        }

        public void DeleteRange(IEnumerable<T> entities)
        {
            using var context = _contextFactory.CreateDbContext();
            context.Set<T>().RemoveRange(entities);
            context.SaveChanges();
        }

        public IReadOnlyList<T> GetAll()
        {
            using var context = _contextFactory.CreateDbContext();
            return context.Set<T>().ToList();
        }

        public async Task<IReadOnlyList<T>> GetAllAsync()
        {
            using var context = _contextFactory.CreateDbContext();
            return await context.Set<T>().ToListAsync();
        }

        public async Task<Product> GetProductByNameAsync(string name)
        {
            using var context = _contextFactory.CreateDbContext();
            return await context.Products.FirstOrDefaultAsync(x => x.Name.ToLower() == name.ToLower());
        }

        public async Task<ProductUnit> GetProductUnitByNameAsync(string name)
        {
            using var context = _contextFactory.CreateDbContext();
            return await context.ProductUnits.FirstOrDefaultAsync(x => x.Name.ToLower() == name.ToLower());
        }
        public async Task<ProductType> GetProductTypeByNameAsync(string name)
        {
            using var context = _contextFactory.CreateDbContext();
            return await context.ProductTypes.FirstOrDefaultAsync(x => x.Name.ToLower() == name.ToLower());
        }

        public async Task<ProductBrand> GetProductBrandByNameAsync(string name)
        {
            using var context = _contextFactory.CreateDbContext();
            return await context.ProductBrands.FirstOrDefaultAsync(x => x.Name.ToLower() == name.ToLower());
        }

        public async Task<T> GetByIdAsync(int id)
        {
            using var context = _contextFactory.CreateDbContext();
            return await context.Set<T>().FindAsync(id);
        }

        public async Task<T> GetEntityWithSpecification(ISpecification<T> spec)
        {
            using var context = _contextFactory.CreateDbContext();


            return await ApplySpecification(spec, context).FirstOrDefaultAsync();
        }

        public async Task<Order> GetOrderWithSpecification(ISpecification<T> spec)
        {
            using var context = _contextFactory.CreateDbContext();

            var result = await ApplySpecification(spec, context).FirstOrDefaultAsync();

            if (result is Order order)
            {
                foreach (var item in order.OrderItems)
                {
                    context.Entry(item).Reference(i => i.ItemOrdered).Load();
                }
            }

            return result as Order;
        }

        public async Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec)
        {
            using var context = _contextFactory.CreateDbContext();
            return await ApplySpecification(spec, context).ToListAsync();
        }

        public async Task UpdateAsync(T entity)
        {
            using var context = _contextFactory.CreateDbContext();
            var existingEntity = await context.Set<T>().FindAsync(entity.Id);
            if (existingEntity != null)
            {
                // Detach the existing entity
                context.Entry(existingEntity).State = EntityState.Detached;
            }
            // Now attach & update your entity
            context.Set<T>().Attach(entity);
            context.Entry(entity).State = EntityState.Modified;
            await context.SaveChangesAsync();
        }

        private IQueryable<T> ApplySpecification(ISpecification<T> spec, StoreDbContext context)
        {
            return SpecificationEvaluator<T>.GetQuery(context.Set<T>().AsQueryable(), spec);
        }
    }
}
