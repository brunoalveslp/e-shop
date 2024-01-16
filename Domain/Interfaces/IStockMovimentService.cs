using Domain.Entities;

namespace Domain.Interfaces;

public interface IStockMovimentService
{
    Task EntryStockMovimentService(Product product);
    Task EntryStockMovimentService(int id, decimal quantity);
    Task OutgoingStockMovimentService(Product product);
    Task OutgoingStockMovimentService(int id, decimal quantity);
    Task<IReadOnlyList<ProductMovimentHistory>> GetProductMoviments(int id);
    Task<IReadOnlyList<ProductMovimentHistory>> GetAllProductMoviments();
}
