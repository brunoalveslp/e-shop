namespace Domain.Entities;

public class CustomerCart
{
    public string Id { get; set; }
    public List<CartItem> Items { get; set; } = new();

    public CustomerCart()
    {
    }
    public CustomerCart(string id)
    {
        Id = id;
    }

    public int? DeliveryMethodId { get; set; }
    public string ClientSecret { get; set; }
    public string PaymentIntentId { get; set; }
    public decimal ShippingPrice { get; set; }

}
