using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity;

public class AppIdentityDbContextSeed
{
    public static async Task SeedUserAsync(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
    {

        var roles = new[] { "Admin", "User" };

        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole(role));
            }
        }

        var userRole = new List<string>() { "Admin", "Üser" };

        if (!userManager.Users.Any())
        {
            var userAdmin = new AppUser
            {
                DisplayName = "Admin",
                Email = "admin@test.com",
                UserName = "admin@test.com",
                Roles = userRole,
                Address = new Address
                {
                    FirstName = "Admin",
                    LastName = "Bruno",
                    Street = "Rua Qualquer Nº100",
                    City = "Brusque",
                    State = "SC",
                    PostalCode = "00000-000"
                }
            };

            var user = new AppUser
            {
                DisplayName = "Consumidor",
                Email = "test@test.com",
                UserName = "test@test.com",
                Roles = userRole,
                Address = new Address
                {
                    FirstName = "Admin",
                    LastName = "Bruno",
                    Street = "Rua Qualquer Nº100",
                    City = "Brusque",
                    State = "SC",
                    PostalCode = "00000-000"
                }
            };

            await userManager.CreateAsync(userAdmin, "Pa$$w0rd");

            await userManager.AddToRoleAsync(userAdmin, "Admin");

            await userManager.CreateAsync(user, "Pa$$w0rd");

            await userManager.AddToRoleAsync(user, "User");
        }
    }
}
