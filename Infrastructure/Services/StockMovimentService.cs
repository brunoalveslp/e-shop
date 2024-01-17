using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using Domain.Specifications;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Infrastructure.Services;

public class StockMovimentService : IStockMovimentService
{
    private readonly IUnitOfWork _unitOfWork;
    public StockMovimentService(IUnitOfWork unitOfWork)
    {

        _unitOfWork = unitOfWork;

    }

    public async Task EntryStockMovimentService(Product product)
    {
        var prod = await _unitOfWork.Repository<Product>().GetByIdAsync(product.Id);

        var moviment = new ProductMovimentHistory
        {
            MovimentType = MovimentType.Entrance.ToString(),
            ProductId = product.Id,
            Quantity = product.Quantity
        };
        try
        {
            await _unitOfWork.Repository<ProductMovimentHistory>().AddAsync(moviment);
            prod.Quantity += product.Quantity;
            _unitOfWork.Repository<Product>().Update(prod);
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }

        await _unitOfWork.Complete();
    }

    public async Task EntryStockMovimentService(int id, decimal quantity)
    {
        var product = await _unitOfWork.Repository<Product>().GetByIdAsync(id);
        if(product is not null)
        {
            var moviment = new ProductMovimentHistory
            {
                MovimentType = MovimentType.Entrance.ToString(),
                ProductId = product.Id,
                Quantity = quantity
            };
            try
            {
                await _unitOfWork.Repository<ProductMovimentHistory>().AddAsync(moviment);
                product.Quantity += quantity;
                _unitOfWork.Repository<Product>().Update(product);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        await _unitOfWork.Complete();
    }

    public async Task OutgoingStockMovimentService(Product product)
    {
        var prod = await _unitOfWork.Repository<Product>().GetByIdAsync(product.Id);
        var moviment = new ProductMovimentHistory
        {
            MovimentType = MovimentType.Output.ToString(),
            ProductId = product.Id,
            Quantity = product.Quantity
        };

        try
        {
            await _unitOfWork.Repository<ProductMovimentHistory>().AddAsync(moviment);
            prod.Quantity -= product.Quantity;
            _unitOfWork.Repository<Product>().Update(prod);
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }

        await _unitOfWork.Complete();
    }

    public async Task OutgoingStockMovimentService(int id, decimal quantity)
    {
        var product = await _unitOfWork.Repository<Product>().GetByIdAsync(id);
        if (product is not null)
        {
            if(quantity <= product.Quantity)
            {
                var moviment = new ProductMovimentHistory
                {
                    MovimentType = MovimentType.Output.ToString(),
                    ProductId = product.Id,
                    Quantity = quantity
                };
                try
                {
                    await _unitOfWork.Repository<ProductMovimentHistory>().AddAsync(moviment);
                    product.Quantity -= quantity;
                    _unitOfWork.Repository<Product>().Update(product);
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
        var moviment = await _unitOfWork.Repository<ProductMovimentHistory>()
                .GetAllAsync();

        return moviment;
    }
}
