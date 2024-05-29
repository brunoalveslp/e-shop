
using API.DTOs;
using AutoMapper;
using Domain.Entities;

namespace API.Helpers;
// configuring to images be located on right place in the project so we can use images properly
public class AditionalProductPictureUrlsResolver : IValueResolver<Product, ProductToReturnDto, string[]>
{
    // IConfiguration from Microsoft not from Mapper
    private readonly IConfiguration _config;
    public AditionalProductPictureUrlsResolver(IConfiguration config)
    {
        _config = config;
    }

    public IConfiguration Config { get; }


    public string[] Resolve(Product source, ProductToReturnDto destination, string[] destMember, ResolutionContext context)
    {
        if (source.AditionalPicturesUrls.Any())
        {
        string[] aditionalImageUrls = new string[source.AditionalPicturesUrls.Count];
            foreach (var image in source.AditionalPicturesUrls.Select((value, i) => new { i, value }))
            {
                if (!string.IsNullOrEmpty(image.value))
                {
                    aditionalImageUrls[image.i] = _config["ApiImagesUrl"] + image.value;
                }
            }

            return aditionalImageUrls;
        }

        return null;
    }
}
