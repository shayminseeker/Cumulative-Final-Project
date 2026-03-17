using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Security.Cryptography;
using System.Text;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<UserInfoDb>(opt => opt.UseInMemoryDatabase("UserDb"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.ConfigureHttpJsonOptions(options => {
    options.SerializerOptions.PropertyNameCaseInsensitive = true;
});

builder.Services.AddCors(options =>{
    options.AddPolicy(name: MyAllowSpecificOrigins,
    policy =>{
        policy.WithOrigins("http://localhost:5173").AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);

static string HashPassword(string? password)
{
    if (string.IsNullOrEmpty(password)) return string.Empty;
    using var sha = SHA256.Create();
    var bytes = Encoding.UTF8.GetBytes(password);
    var hash = sha.ComputeHash(bytes);
    return Convert.ToBase64String(hash);
}

public record RegisterRequest(string? Username, string? Email, string? Password);
public record LoginRequest(string? Username, string? Password);

app.MapPost("/register", async (RegisterRequest req, UserInfoDb db) =>
{
    if (string.IsNullOrWhiteSpace(req.Username) || string.IsNullOrWhiteSpace(req.Password))
        return Results.BadRequest("Username and password are required");

    var existing = await db.Users.FirstOrDefaultAsync(u => u.Username == req.Username);
    if (existing is not null) return Results.Conflict("Username already exists");

    var user = new UserInfo
    {
        Username = req.Username,
        Email = req.Email,
        PasswordHash = HashPassword(req.Password),
        IsAdmin = false
    };

    db.Users.Add(user);
    await db.SaveChangesAsync();

    return Results.Created($"/users/{user.Id}", new { user.Id, user.Username, user.Email, user.IsAdmin });
});

app.MapPost("/login", async (LoginRequest req, UserInfoDb db) =>
{
    if (string.IsNullOrWhiteSpace(req.Username) || string.IsNullOrWhiteSpace(req.Password))
        return Results.BadRequest("Username and password are required");

    var user = await db.Users.FirstOrDefaultAsync(u => u.Username == req.Username);
    if (user is null) return Results.Unauthorized();

    var hash = HashPassword(req.Password);
    if (user.PasswordHash != hash) return Results.Unauthorized();

    return Results.Ok(new { user.Id, user.Username, user.Email, user.IsAdmin });
});

app.Run();
