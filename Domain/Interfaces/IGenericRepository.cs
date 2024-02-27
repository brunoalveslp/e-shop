using Domain.Entities;
using Domain.Specifications;


namespace Domain.Interfaces;

public interface IGenericRepository<T> where T : BaseEntity
{
    Task<T> GetByIdAsync(int id);
    Task<ProductUnit> GetProductUnitByNameAsync(string name);
    Task<ProductBrand> GetProductBrandByNameAsync(string name);
    Task<ProductType> GetProductTypeByNameAsync(string name);
    Task<IReadOnlyList<T>> GetAllAsync();
    Task<T> GetEntityWithSpecification(ISpecification<T> spec);
    Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec);

    Task<int> CountAsync(ISpecification<T> spec);
    Task AddAsync(T entity);
    Task UpdateAsync(T entity);
    void Delete(T entity);
}