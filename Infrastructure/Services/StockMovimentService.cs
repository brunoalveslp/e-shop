using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using Domain.Specifications;

namespace Infrastructure.Services;
public class StockMovimentService : IStockMovimentService
{
    private readonly IUnitOfWork _unitOfWork;
    public StockMovimentService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task EntryStockMovimentService(Product product, Size size, decimal quantity)
    {
        var prod = await _unitOfWork.Repository<Product>().GetByIdAsync(product.Id);
        var prodSize = prod.ProductSizes.FirstOrDefault(ps => ps.SizeId == size.Id);

        var moviment = new ProductMovimentHistory
        {
            MovimentType = MovimentType.Entrada.ToString(),
            ProductId = product.Id,
            SizeId = size.Id,
            Quantity = quantity
        };

        try
        {
            await _unitOfWork.Repository<ProductMovimentHistory>().AddAsync(moviment);
            prodSize.Quantity += quantity;
            await _unitOfWork.Repository<ProductSize>().UpdateAsync(prodSize);
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }

        await _unitOfWork.Complete();
    }

    public async Task OutgoingStockMovimentService(Product product, Size size, decimal quantity)
    {
        var prod = await _unitOfWork.Repository<Product>().GetByIdAsync(product.Id);
        if(prod is not null){
            var prodSize = _unitOfWork.Repository<ProductSize>().GetAllAsync().Result.FirstOrDefault(x => x.ProductId == prod.Id && x.SizeId == size.Id);

        if (quantity <= prodSize.Quantity)
        {
            var moviment = new ProductMovimentHistory
            {
                MovimentType = MovimentType.Saida.ToString(),
                ProductId = product.Id,
                SizeId = size.Id,
                Quantity = quantity
            };

            try
            {
                await _unitOfWork.Repository<ProductMovimentHistory>().AddAsync(moviment);
                prodSize.Quantity -= quantity;
                await _unitOfWork.Repository<ProductSize>().UpdateAsync(prodSize);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        }

        await _unitOfWork.Complete();
    }

    public async Task<IReadOnlyList<ProductMovimentHistory>> GetProductMoviments(int id)
    {
        var spec = new ProductMovimentSpecification(id);
        var moviment = await _unitOfWork.Repository<ProductMovimentHistory>().ListAsync(spec);
        return moviment;
    }

    public async Task<IReadOnlyList<ProductMovimentHistory>> GetAllProductMoviments()
    {
        var moviment = await _unitOfWork.Repository<ProductMovimentHistory>().GetAllAsync();
        return moviment;
    }
}
