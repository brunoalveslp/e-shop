using API.Errors;
using API.Helpers;
using Domain.Interfaces;
using Infraestructure.Services;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Extentions;

public static class ApplicationServicesExtentions
{
    public static IServiceCollection AddApplicationService(this IServiceCollection services)
    {
        // Add repository service
        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
        services.AddScoped<ICartRepository, CartRepository>();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IOrderService, OrderService>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped<IStockMovimentService, StockMovimentService>();
        services.AddScoped<IFileService, FileService>();
        services.AddScoped<IPaymentService, PaymentService>();
        services.AddScoped<SizeNameResolver>();

        // just like configure method inside startup class
        services.Configure<ApiBehaviorOptions>(options =>
        {
            options.InvalidModelStateResponseFactory = actioncontext =>
            {
                var errors = actioncontext.ModelState
                                            .Where(e => e.Value.Errors.Count > 0)
                                            .SelectMany(e => e.Value.Errors)
                                            .Select(x => x.ErrorMessage).ToArray();

                var errorResponse = new ApiValidationErrorResponse
                {
                    Errors = errors
                };

                return new BadRequestObjectResult(errorResponse);
            };
        });

        return services;
    }
}
