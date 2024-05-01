

using Domain.Entities;

namespace API.DTOs;

public class OrderItemDto
{
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public string PictureUrl { get; set; }
    public decimal Price { get; set; }
    public int SizeId { get; set; }
    public Size Size { get; set; }
    public decimal Quantity { get; set; }
}