using API.DTOs;
using AutoMapper;
using Domain.Entities;
using Domain.Entities.Identity;
using Domain.Entities.OrderAggregate;
using Newtonsoft.Json;


namespace API.Helpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        // the way we configure automapper to map properties as brand and type name properly
        CreateMap<Product, ProductToReturnDto>()
            .ForMember(pb => pb.ProductBrand, p => p.MapFrom(x => x.ProductBrand.Name))
            .ForMember(pt => pt.ProductType, p => p.MapFrom(x => x.ProductType.Name))
            .ForMember(pu => pu.ProductUnit, p => p.MapFrom(x => x.ProductUnit.Name))
            .ForMember(pp => pp.AditionalPicturesUrls, p => p.MapFrom<AditionalProductPictureUrlsResolver>())
            .ForMember(pp => pp.PictureUrl, p => p.MapFrom<ProductPictureUrlResolver>())
            .ForMember(ps => ps.ProductSizes, p => p.MapFrom<ProductSizeResolver>())
            .ReverseMap();

        CreateMap<Product, ProductReceivedDto>()
            .ForMember(p => p.ProductSizes, p => p.Ignore())
            .ForMember(pb => pb.ProductBrandName, p => p.MapFrom(x => x.ProductBrand.Name))
            .ForMember(pt => pt.ProductTypeName, p => p.MapFrom(x => x.ProductType.Name))
            .ForMember(pu => pu.ProductUnitName, p => p.MapFrom(x => x.ProductUnit.Name))
            .ReverseMap();

        CreateMap<ProductReceivedDto, Product>()
            .ForMember(pb => pb.ProductBrand, p => p.MapFrom(x => x.ProductBrandName))
            .ForMember(pt => pt.ProductType, p => p.MapFrom(x => x.ProductTypeName))
            .ForMember(pu => pu.ProductUnit, p => p.MapFrom(x => x.ProductUnitName))
            .ForMember(p => p.ProductSizes, p => p.Ignore());

        CreateMap<ProductMovimentHistory, StockMoviment>()
            .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product.Name))
            .ForMember(dest => dest.SizeName, opt => opt.MapFrom(src => src.Size.Name));

        CreateMap<ProductSize, ProductSizeDto>().ReverseMap();

        CreateMap<Domain.Entities.Identity.Address, AddressDto>().ReverseMap();
        

        CreateMap<CustomerCartDto, CustomerCart>();
        CreateMap<CartItemDto, CartItem>();

        CreateMap<AddressDto, Domain.Entities.OrderAggregate.Address>();

        CreateMap<Domain.Entities.OrderAggregate.Order, OrderToReturnDto>()
             .ForMember(o => o.DeliveryMethod, o => o.MapFrom(s => s.DeliveryMethod.ShortName))
             .ForMember(d => d.ShippingPrice, d => d.MapFrom(s => s.DeliveryMethod.Price));


        CreateMap<OrderItem, OrderItemDto>()
                .ForMember(d => d.ProductId, o => o.MapFrom(s => s.ItemOrdered.ProductItemId))
                .ForMember(d => d.ProductName, o => o.MapFrom(s => s.ItemOrdered.ProductName))
                .ForMember(d => d.PictureUrl, o => o.MapFrom(s => s.ItemOrdered.PictureUrl))
                .ForMember(d => d.PictureUrl, o => o.MapFrom<OrderItemUrlResolver>());

    }

}
