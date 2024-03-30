using API.DTOs;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;

namespace API.Helpers;
public class ProductSizeResolver : IValueResolver<Product, ProductToReturnDto, IReadOnlyList<ProductSizeDto>>
{
    private readonly IUnitOfWork _unitOfWork;

    public ProductSizeResolver(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public IReadOnlyList<ProductSizeDto> Resolve(Product source, ProductToReturnDto destination, IReadOnlyList<ProductSizeDto> destMember, ResolutionContext context)
    {
        var productSizes = _unitOfWork.Repository<ProductSize>().GetAll().ToList();
        var filteredProductSizes = productSizes.Where(ps => ps.ProductId == source.Id).ToList();

        var productSizeDtos = new List<ProductSizeDto>();

        foreach (var productSize in filteredProductSizes)
        {
            productSizeDtos.Add(new ProductSizeDto
            {
                SizeId = productSize.SizeId,
                Quantity = productSize.Quantity,
                IsActive = productSize.IsActive,
            });
        }

        return productSizeDtos;
    }
}