
using API.Extentions;
using API.Helpers;
using API.Middleware;
using Domain.Entities.Identity;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.OpenApi.Models;
using StackExchange.Redis;
using Swashbuckle.AspNetCore.Filters;
using System.Text.Json.Serialization;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var config = builder.Configuration;

            // Add services to the container.

            builder.Services.AddControllers().AddJsonOptions(x =>
                    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var connectionString = config.GetConnectionString("DefaultConnection");

            builder.Services.AddDbContextFactory<StoreDbContext>(
                opt => {
                    opt.UseNpgsql(connectionString);
                    
                    });

            builder.Services.AddSingleton<IConnectionMultiplexer>(c =>
            {
                var options = ConfigurationOptions.Parse(config.GetConnectionString("Redis"));
                return ConnectionMultiplexer.Connect(options);
            });


            builder.Services.AddIdentityService(config);

            builder.Services.AddApplicationService();

            builder.Services.AddAutoMapper(typeof(MappingProfiles));

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAngularOrigins",
                builder =>
                {
                    builder.WithOrigins(
                                        "https://localhost:4200"
                                        )
                                        .AllowAnyHeader()
                                        .AllowAnyMethod();
                });
            });


            builder.Services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey
                });

                options.OperationFilter<SecurityRequirementsOperationFilter>();
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseStaticFiles();   
            app.UseStaticFiles(new StaticFileOptions 
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), "Files")
                ),
                RequestPath = "/Files"
            });   

            app.UseMiddleware<ExceptionMiddleware>();

            // error handling needs this
            app.UseStatusCodePagesWithReExecute("/errors/{0}");

            //app.MapIdentityApi<AppUser>();

            app.UseHttpsRedirection();

            // use cors
            app.UseCors("AllowAngularOrigins");

            // IT has to be configured to use cookies
            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();
            app.MapFallbackToController("Index", "Fallback");

            // Seeds Roles and User

            using (var scope = app.Services.CreateScope())
            {

                var context = scope.ServiceProvider.GetRequiredService<StoreDbContext>();
                var identityContext = scope.ServiceProvider.GetRequiredService<AppIdentityDbContext>();

                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
                var loggerFactory = scope.ServiceProvider.GetRequiredService<ILoggerFactory>();
                
                try
                {
                    await context.Database.MigrateAsync();
                    await identityContext.Database.MigrateAsync();
                    await StoreContextSeed.SeedAsync(context, loggerFactory);
                    await AppIdentityDbContextSeed.SeedUserAsync(userManager, roleManager);

                }
                catch(Exception ex)
                {
                    var logger = loggerFactory.CreateLogger<Program>();
                    logger.LogError(ex, "An error occured during migration.");
                }   
            }


            app.Run();
        }
    }
}
