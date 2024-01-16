
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.DTOs;

public class ProductReceivedDto
{
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public decimal Weight { get; set; }
    public List<string> PicturesUrls { get; set; }
    public int ProductTypeId { get; set; }
    public int ProductBrandId { get; set; }
    public int ProductUnitId { get; set; }
}