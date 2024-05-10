using Domain.Entities;

namespace Domain.Specifications;

public class ProductMovimentSpecification : BaseSpecification<ProductMovimentHistory>
{
    public ProductMovimentSpecification(int productId)
        : base(m => m.ProductId == productId)
    {
        AddInclude(m => m.Product);
        AddInclude(s => s.Size);
    }

    public ProductMovimentSpecification()
    {
        AddInclude(m => m.Product);
        AddInclude(s => s.Size);
    }
}
