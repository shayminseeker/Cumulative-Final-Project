using Microsoft.EntityFrameworkCore;
using System.Text.Json;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ProductDb>(opt => opt.UseInMemoryDatabase("ProductList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.ConfigureHttpJsonOptions(options => {
    options.SerializerOptions.PropertyNameCaseInsensitive = true;
});

builder.Services.AddCors(options =>{
    options.AddPolicy(name: MyAllowSpecificOrigins,
    policy =>{
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

app.MapGet("/products", async (ProductDb db) =>
    await db.Products.ToListAsync());

app.MapGet("/products/{id:int}", async (int id, ProductDb db) =>
    await db.Products.FindAsync(id) is Product product ? Results.Ok(product) : Results.NotFound());

app.MapPatch("/products/{id:int}/purchase", async (int id, PurchaseRequest request, ProductDb db) =>
{
    if (request.Quantity <= 0)
    {
        return Results.BadRequest(new { message = "Quantity must be at least 1." });
    }

    var product = await db.Products.FindAsync(id);
    if (product is null)
    {
        return Results.NotFound();
    }

    if (product.Inventory_Count < request.Quantity)
    {
        return Results.BadRequest(new { message = "Not enough stock available." });
    }

    product.Inventory_Count -= request.Quantity;
    await db.SaveChangesAsync();
    return Results.Ok(product);
});

app.MapPost("/products", async (Product product, ProductDb db) =>
{
    Console.WriteLine(product.Inventory_Count);
    db.Products.Add(product);
    await db.SaveChangesAsync();

    return Results.Created($"/products/{product.Id}",product);
});

app.UseCors(MyAllowSpecificOrigins);

app.Run();
