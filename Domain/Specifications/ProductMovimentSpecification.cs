using Domain.Entities;

namespace Domain.Specifications;

public class ProductMovimentSpecification : BaseSpecification<ProductMovimentHistory>
{
    public ProductMovimentSpecification
        (int productId) : base(p => p.ProductId == productId) { }
}
