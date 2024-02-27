using Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class CartItemDto
{
    [Required]
    public int Id { get; set; }
    [Required]
    public string ProductName { get; set; }
    [Required]
    [Range(0.1, double.MaxValue, ErrorMessage = "Preço deve ser maior que zero.")]
    public Decimal Price { get; set; }
    [Required]
    public Size Size { get; set; }
    [Required]
    public decimal Quantity { get; set; }
    [Required]
    public decimal Weight { get; set; }
    [Required]
    public string PictureUrl { get; set; }
    [Required]
    public string Brand { get; set; }
    [Required]
    public string Type { get; set; }
    [Required]
    public string Unit { get; set; }
}
