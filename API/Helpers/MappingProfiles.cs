using API.DTOs;
using AutoMapper;
using Domain.Entities;
using Domain.Entities.Identity;


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
            .ForMember(pp => pp.PicturesUrls, p => p.MapFrom<ProductPictureUrlsResolver>());
            

        CreateMap<Product, ProductReceivedDto>()
            .ReverseMap();

        CreateMap<Address, AddressDto>().ReverseMap();
        

        CreateMap<CustomerCartDto, CustomerCart>();
        CreateMap<CartItemDto, CartItem>();

        CreateMap<AddressDto, Domain.Entities.OrderAggregate.Address>();

        CreateMap<Domain.Entities.OrderAggregate.Order, OrderToReturnDto>()
             .ForMember(o => o.DeliveryMethod, o => o.MapFrom(s => s.DeliveryMethod.ShortName))
             .ForMember(d => d.ShippingPrice, d => d.MapFrom(s => s.DeliveryMethod.Price));

      
       CreateMap<Domain.Entities.OrderAggregate.OrderItem, OrderItemDto>()
            .ForMember(p => p.ProductId, p => p.MapFrom(s => s.ItemOrdered.ProductItemId))
            .ForMember(p => p.ProductName, p => p.MapFrom(s => s.ItemOrdered.ProductName));
 
    }
}
