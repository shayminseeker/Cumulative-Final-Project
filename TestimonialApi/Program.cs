using Microsoft.EntityFrameworkCore;
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<TestimonialDb>(opt => opt.UseInMemoryDatabase("TestimonialList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddCors(options =>{
    options.AddPolicy(name: MyAllowSpecificOrigins,
    policy =>{
        policy.WithOrigins("http://localhost:5173").AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

app.MapGet("/testimonials", async (TestimonialDb db) =>
    await db.Testimonials.ToListAsync());

app.MapPost("/testimonials", async (Testimonial testimonial, TestimonialDb db) =>
{
    db.Testimonials.Add(testimonial);
    await db.SaveChangesAsync();

    return Results.Created($"/testimonials/{testimonial.Id}",testimonial);
});

app.UseCors(MyAllowSpecificOrigins);

app.Run();
