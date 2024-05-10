using API.DTOs;
using AutoMapper;
using Domain.Entities;

namespace API.Helpers;

public class SizeNameResolver : IValueResolver<ProductMovimentHistory, StockMoviment, string>
{
    public string Resolve(ProductMovimentHistory source, StockMoviment destination, string destMember, ResolutionContext context)
    {
        if (source.Product == null || source.Product.ProductSizes == null)
        {
            return null;
        }

        var productSize = source.Product.ProductSizes.FirstOrDefault(ps => ps.SizeId == source.SizeId);

        return productSize?.Size?.Name;
    }
}
