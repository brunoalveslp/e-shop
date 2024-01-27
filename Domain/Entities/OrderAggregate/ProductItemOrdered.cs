namespace Domain.Entities.OrderAggregate;

public class ProductItemOrdered : BaseEntity
{
    public int ProductItemId { get; set; }
    public string ProductName { get; set; }
    public string PictureUrl { get; set; }

    public ProductItemOrdered()
    {
    }

    public ProductItemOrdered(int productItemId, string productName, string pictureUrl)
    {
        ProductItemId = productItemId;
        ProductName = productName;
        PictureUrl = pictureUrl;
    }

}
