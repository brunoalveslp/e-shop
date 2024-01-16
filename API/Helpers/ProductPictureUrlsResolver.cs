
using API.DTOs;
using AutoMapper;
using Domain.Entities;

namespace API.Helpers;
// configuring to images be located on right place in the project so we can use images properly
public class ProductPictureUrlsResolver : IValueResolver<Product, ProductToReturnDto, string[]>
{
    // IConfiguration from Microsoft not from Mapper
    private readonly IConfiguration _config;
    public ProductPictureUrlsResolver(IConfiguration config)
    {
        _config = config;
    }

    public IConfiguration Config { get; }


    public string[] Resolve(Product source, ProductToReturnDto destination, string[] destMember, ResolutionContext context)
    {
        if (source.PicturesUrls.Any())
        {
        string[] imageUrls = new string[source.PicturesUrls.Count];
            foreach (var image in source.PicturesUrls.Select((value, i) => new { i, value }))
            {
                if (!string.IsNullOrEmpty(image.value))
                {

                    imageUrls[image.i] = _config["ApiUrl"] + image.value;
                }
            }

            return imageUrls;
        }

        return null;
    }
}
