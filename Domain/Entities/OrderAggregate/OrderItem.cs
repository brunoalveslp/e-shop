namespace Domain.Entities.OrderAggregate;

public class OrderItem : BaseEntity
{
    public int ItemOrderedId { get; set; }
    public ProductItemOrdered ItemOrdered { get; set; }
    public int OrderId { get; set; }
    public int SizeId { get; set; }
    public Size Size { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }

    public OrderItem()
    {
    }

    public OrderItem(ProductItemOrdered itemOrdered, decimal price, int quantity, Size size)
    {
        ItemOrdered = itemOrdered;
        Price = price;
        Quantity = quantity;
        SizeId = size.Id;
    }
}

