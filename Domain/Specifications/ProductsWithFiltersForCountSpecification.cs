
using Domain.Entities;

namespace Domain.Specifications;

public class ProductsWithFiltersForCountSpecification : BaseSpecification<Product>
{
    public ProductsWithFiltersForCountSpecification(ProductSpecParams productParams)
       : base(x =>
               (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search)) &&
               (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId) &&
               (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) &&
               (!productParams.UnitId.HasValue || x.ProductUnitId == productParams.UnitId)
       )
    { }

}