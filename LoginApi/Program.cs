using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddScoped<AuthService>();
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("ProductList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.ConfigureHttpJsonOptions(options => {
    options.SerializerOptions.PropertyNameCaseInsensitive = true;
});
var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    const string adminEmail = "snowfalcon2020@gmail.com";
    const string adminPassword = "Ln984904!";

    var existingAdminUser = db.Users.FirstOrDefault(u => u.Email == adminEmail);
    if (existingAdminUser == null)
    {
        db.Users.Add(new User
        {
            Firstname = "Snow",
            Email = adminEmail,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(adminPassword),
            Role = "Admin"
        });
        db.SaveChanges();
    }
    else if (existingAdminUser.Role != "Admin")
    {
        existingAdminUser.Role = "Admin";
        existingAdminUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(adminPassword);
        db.SaveChanges();
    }
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.MapControllers();

app.Run();