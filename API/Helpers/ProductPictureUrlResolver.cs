
using API.DTOs;
using AutoMapper;
using Domain.Entities;

namespace API.Helpers;
// configuring to images be located on right place in the project so we can use images properly
public class ProductPictureUrlResolver : IValueResolver<Product, ProductToReturnDto, string>
{
    // IConfiguration from Microsoft not from Mapper
    private readonly IConfiguration _config;
    public ProductPictureUrlResolver(IConfiguration config)
    {
        _config = config;
    }

    public string Resolve(Product source, ProductToReturnDto destination, string destMember, ResolutionContext context)
    {
        if (!string.IsNullOrEmpty(source.PictureUrl))
        {
            source.PictureUrl = _config["ApiImagesUrl"] + source.PictureUrl;
            return source.PictureUrl;
        }
        return null;
    }
}
