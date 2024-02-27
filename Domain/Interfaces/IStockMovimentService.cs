using Domain.Entities;

namespace Domain.Interfaces;

public interface IStockMovimentService
{
    //Task EntryStockMovimentService(Product product);
    Task EntryStockMovimentService(Product product, Size size, decimal quantity);
    //Task OutgoingStockMovimentService(Product product);
    Task OutgoingStockMovimentService(Product product, Size size, decimal quantity);
    Task<IReadOnlyList<ProductMovimentHistory>> GetProductMoviments(int id);
    Task<IReadOnlyList<ProductMovimentHistory>> GetAllProductMoviments();
}
