using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;
public class Product : BaseEntity
{
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public string PictureUrl { get; set; }
    public List<string> AditionalPicturesUrls { get; set; }
    public decimal Weight { get; set; }
    public List<ProductSize> ProductSizes { get; set; }
    public ProductUnit ProductUnit { get; set; }
    public int ProductUnitId { get; set; }
    public ProductType ProductType { get; set; }
    public int ProductTypeId { get; set; }
    public ProductBrand ProductBrand { get; set; }
    public int ProductBrandId { get; set; }
}
