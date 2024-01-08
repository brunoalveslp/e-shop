
namespace API.DTOs;

public class ProductToReturnDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public decimal Weight { get; set; }
    public List<string> PicturesUrls { get; set; }
    public string ProductType { get; set; }
    public string ProductBrand { get; set; }
    public string ProductUnit { get; set; }
}