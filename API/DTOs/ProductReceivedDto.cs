namespace API.DTOs;

public class ProductReceivedDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public decimal Weight { get; set; }
    public string PictureUrl { get; set; }
    public string ProductSizes { get; set; }
    public IFormFile picture { get; set; }
    public List<string> AditionalPicturesUrls { get; set; }
    public IFormFileCollection aditionalPictures {  get; set; }
    public string ProductTypeName { get; set; }
    public string ProductBrandName { get; set; }
    public string ProductUnitName { get; set; }
}