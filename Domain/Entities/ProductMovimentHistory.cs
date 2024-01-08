namespace Domain.Entities;

public class ProductMovimentHistory : BaseEntity
{
    public int MovimentType { get; set; }
    public decimal Quantity { get; set; }
    public Product Product { get; set; }
    public int ProductId { get; set; }

}
