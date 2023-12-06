
using API.Extentions;
using Domain.Entities.Identity;
using Infraestructure.Data;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var config = builder.Configuration;

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var connectionString = config.GetConnectionString("DefaultConnection");

            builder.Services.AddDbContext<StoreDbContext>(
                opt => opt.UseNpgsql(connectionString));

            builder.Services.AddDbContext<AppIdentityDbContext>(opt =>
                opt.UseNpgsql(config.GetConnectionString("IdentityConnection")));

            builder.Services.AddIdentityService(config);


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            
            app.MapIdentityApi<AppUser>();

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
