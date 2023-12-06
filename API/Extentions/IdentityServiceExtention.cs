using Domain.Entities.Identity;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extentions;

public static class IdentityServiceExtention
{
    public static IServiceCollection AddIdentityService
        (this IServiceCollection services,
         IConfiguration config
        )
    {
        services.AddDbContext<AppIdentityDbContext>(opt =>
        {
            opt.UseNpgsql(config.GetConnectionString("IdentityConnection"));
        });

        services.AddIdentityCore<AppUser>()
            .AddEntityFrameworkStores<AppIdentityDbContext>()
            .AddApiEndpoints();

        services.AddAuthentication().AddBearerToken(IdentityConstants.BearerScheme);
        services.AddAuthorizationBuilder();

        return services;
    }
}
