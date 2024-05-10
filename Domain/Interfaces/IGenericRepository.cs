using Domain.Entities;
using Domain.Entities.OrderAggregate;
using Domain.Specifications;


namespace Domain.Interfaces;

public interface IGenericRepository<T> where T : BaseEntity
{
    Task<T> GetByIdAsync(int id);
    Task<Product> GetProductByNameAsync(string name);
    Task<ProductUnit> GetProductUnitByNameAsync(string name);
    Task<ProductBrand> GetProductBrandByNameAsync(string name);
    Task<ProductType> GetProductTypeByNameAsync(string name);
    Task<IReadOnlyList<T>> GetAllAsync();
    IReadOnlyList<T> GetAll();
    Task<T> GetEntityWithSpecification(ISpecification<T> spec);
    Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec);
    Task<Order> GetOrderWithSpecification(ISpecification<T> spec);

    Task<int> CountAsync(ISpecification<T> spec);
    Task AddAsync(T entity);
    Task UpdateAsync(T entity);
    void Delete(T entity);
}