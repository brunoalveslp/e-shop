using Domain.Entities;

namespace API.DTOs;

public class StockMoviment
{
    public int Id { get; set; }
    public string MovimentType { get; set; }
    public int SizeId { get; set; }
    public string SizeName { get; set; }
    public Product Product { get; set; }
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public decimal Quantity { get; set; }
}
