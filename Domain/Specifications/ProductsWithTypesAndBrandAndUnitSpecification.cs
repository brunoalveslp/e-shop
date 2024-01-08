
using Domain.Entities;

namespace Domain.Specifications;

public class ProductsWithTypesAndBrandAndUnitSpecification : BaseSpecification<Product>
{
    public ProductsWithTypesAndBrandAndUnitSpecification(ProductSpecParams productParams)
        : base(x =>
                (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search)) &&
                (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId) &&
                (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) &&
               (!productParams.UnitId.HasValue || x.ProductUnitId == productParams.UnitId)
        )
    {
        AddInclude(p => p.ProductType);
        AddInclude(p => p.ProductBrand);
        AddInclude(p => p.ProductUnit);
        AddOrderBy(p => p.Name);
        ApplyPaging(productParams.PageSize*(productParams.PageIndex -1), productParams.PageSize);

        if (!string.IsNullOrEmpty(productParams.Sort))
        {
            switch (productParams.Sort)
            {
                case "priceAsc":
                    AddOrderBy(p => p.Price);
                    break;
                case "priceDesc":
                    AddOrderByDescending(p => p.Price);
                    break;
                default:
                    AddOrderBy(p => p.Name);
                    break;
            }
        }
    }

    public ProductsWithTypesAndBrandAndUnitSpecification(int id) : base(p => p.Id == id)
    {
        AddInclude(p => p.ProductType);
        AddInclude(p => p.ProductBrand);
        AddInclude(p => p.ProductUnit);
    }
}