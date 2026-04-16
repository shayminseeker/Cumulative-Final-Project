using Microsoft.EntityFrameworkCore;
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

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.MapControllers();

app.Run();