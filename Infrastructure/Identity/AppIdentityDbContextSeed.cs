using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Identity;

public class AppIdentityDbContextSeed
{
    public static async Task SeedUserAsync(UserManager<User> userManager)
    {
        if(!userManager.Users.Any())
        {
            var user = new User
            {
                DisplayName = "Admin",
                Email = "admin@test.com",
                UserName = "admin@test.com",
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

            await userManager.CreateAsync(user, "Pa$$w0rd");
        }
    }
}
