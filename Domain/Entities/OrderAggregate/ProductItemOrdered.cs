namespace Domain.Entities.OrderAggregate;

public class ProductItemOrdered : BaseEntity
{
    public int ProductItemId { get; set; }
    public string ProductName { get; set; }
    public List<string> PicturesUrls { get; set; }

    public ProductItemOrdered()
    {
    }

    public ProductItemOrdered(int productItemId, string productName, List<string> picturesUrls)
    {
        ProductItemId = productItemId;
        ProductName = productName;
        PicturesUrls = picturesUrls;
    }

}
