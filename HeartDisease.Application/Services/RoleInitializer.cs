using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using HeartDisease.Infrastructure.Models; 

public static class RoleInitializer
{
    public static async Task Initialize(IServiceProvider serviceProvider)
    {
        var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

        string[] roleNames = { "Admin", "Doctor", "Patient" };
        IdentityResult roleResult;

        foreach (var roleName in roleNames)
        {
            var roleExist = await roleManager.RoleExistsAsync(roleName);
            if (!roleExist)
            {
                roleResult = await roleManager.CreateAsync(new IdentityRole(roleName));
            }
        }

        var user = await userManager.FindByEmailAsync("admin@example.com");
        if (user == null)
        {
            user = new User
            {
                UserName = "admin@example.com",
                Email = "admin@example.com"
            };
            await userManager.CreateAsync(user, "Admin123!");
        }
        await userManager.AddToRoleAsync(user, "Admin");
    }
}
