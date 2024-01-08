using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class CartItemDto
{
    [Required]
    public int Id { get; set; }
    [Required]
    public string ProductName { get; set; }
    [Required]
    [Range(0.1, double.MaxValue, ErrorMessage = "Price must be greater than zero.")]
    public Decimal Price { get; set; }
    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1.")]
    public int Quantity { get; set; }
    [Required]
    public decimal Weight { get; set; }
    [Required]
    public List<string> PicturesUrls { get; set; }
    [Required]
    public string Brand { get; set; }
    [Required]
    public string Type { get; set; }
    [Required]
    public string Unit { get; set; }
}
