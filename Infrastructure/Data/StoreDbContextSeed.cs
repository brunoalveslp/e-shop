
using System.Reflection;
using System.Text.Json;
using Domain.Entities;
using Domain.Entities.OrderAggregate;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreDbContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                // IF WINDOWS APP
                // var path = Path.GetFullPath(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"..\..\..\..\"));

                // IF DOCKER CONTAINER
                var path = "/src/";

                if (!context.ProductBrands.Any())
                {
                    var brandsData =
                        File.ReadAllText(path + @"Infrastructure/Data/SeedData/brands.json");

                    var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);

                    foreach (var item in brands)
                    {
                        context.ProductBrands.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.ProductUnits.Any())
                {
                    var unitsData =
                        File.ReadAllText(path + @"Infrastructure/Data/SeedData/units.json");

                    var units = JsonSerializer.Deserialize<List<ProductUnit>>(unitsData);

                    foreach (var item in units)
                    {
                        context.ProductUnits.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.ProductTypes.Any())
                {
                    var typesData =
                        File.ReadAllText(path + @"Infrastructure/Data/SeedData/types.json");

                    var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);

                    foreach (var item in types)
                    {
                        context.ProductTypes.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.Size.Any())
                {
                    var sizesData =
                        File.ReadAllText(path + @"Infrastructure/Data/SeedData/sizes.json");

                    var sizes = JsonSerializer.Deserialize<List<Size>>(sizesData);

                    foreach (var item in sizes)
                    {
                        context.Size.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.Products.Any())
                {
                    var productsData =
                        File.ReadAllText(path + @"Infrastructure/Data/SeedData/products.json");

                    var products = JsonSerializer.Deserialize<List<Product>>(productsData);

                    foreach (var item in products)
                    {
                        context.Products.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.DeliveryMethods.Any())
                {
                    var dmData =
                        File.ReadAllText(path + @"Infrastructure/Data/SeedData/delivery.json");

                    var methods = JsonSerializer.Deserialize<List<DeliveryMethod>>(dmData);

                    foreach (var item in methods)
                    {
                        context.DeliveryMethods.Add(item);
                    }

                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<StoreContextSeed>();
                logger.LogError(ex.Message);
            }
        }
    }
}