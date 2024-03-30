namespace Domain.Entities;

public class ProductSize : BaseEntity
{
    public int ProductId { get; set; }
    public Product Product { get; set; }
    public int SizeId { get; set; }
    public Size Size { get; set; }
    public decimal Quantity { get; set; }
    public bool IsActive { get; set; }
}
