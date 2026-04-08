using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Add InMemory DB for users
builder.Services.AddDbContext<LoginDb>(opt => opt.UseInMemoryDatabase("LoginList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>{
	options.AddPolicy(name: MyAllowSpecificOrigins,
	policy =>{
		policy.WithOrigins("http://localhost:5173").AllowAnyMethod().AllowAnyHeader();
	});
});

var app = builder.Build();

var provider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory()));
app.UseStaticFiles(new StaticFileOptions { FileProvider = provider, RequestPath = "" });

app.UseCors(MyAllowSpecificOrigins);

// Redirect root to login page
app.MapGet("/", () => Results.Redirect("/login.html"));

// GET all users (for testing/demo)
app.MapGet("/users", async (LoginDb db) => await db.Users.ToListAsync());

// Signup - create user
app.MapPost("/signup", async (Login user, LoginDb db) =>
{
	// basic uniqueness check by email
	var exists = await db.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == user.Email.ToLower());
	if (exists is not null) return Results.Conflict(new { message = "User already exists" });

	db.Users.Add(user);
	await db.SaveChangesAsync();
	return Results.Created($"/users/{user.Id}", user);
});

// Login - simple credential check
app.MapPost("/login", async (Login creds, LoginDb db) =>
{
	var user = await db.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == creds.Email.ToLower());
	if (user is null) return Results.Unauthorized();
	if (user.Password != creds.Password) return Results.Unauthorized();

	return Results.Ok(new { message = "Login successful", email = user.Email });
});

app.Run();
