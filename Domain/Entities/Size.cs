namespace Domain.Entities;

public class Size : BaseEntity
{
    public string Name { get; set; }
    public bool IsActive { get; set; }
    public List<ProductSize> ProductSizes { get; set; }
}
