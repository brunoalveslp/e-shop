﻿using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;
using System.Security.Claims;

namespace API.Extentions;

public static class UserManagerExtentions
{
    public static async Task<AppUser> FindUserByClaimsPrincipalWithAddress(this UserManager<AppUser> userManager,
        ClaimsPrincipal user)
    {
        var email = user.FindFirstValue(ClaimTypes.Email);

        return await userManager.Users
            .Include(x => x.Address)
            .SingleOrDefaultAsync(x => x.Email == email);
    }

    public static async Task<AppUser> FindByEmailFromClaimsPrincipal(this UserManager<AppUser> userManager,
        ClaimsPrincipal user)
    {
        return await userManager.Users
            .SingleOrDefaultAsync(x => x.Email == user.FindFirstValue(ClaimTypes.Email));
    }

    public static async Task<List<AppUser>> ListUsersWithAdress(this UserManager<AppUser> userManager)
    {
        return await userManager.Users
            .Include(x => x.Address)
            .ToListAsync();
    }
}
