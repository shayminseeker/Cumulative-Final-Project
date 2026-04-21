using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using System.Threading.Tasks;

public class AuthService
{
    private readonly AppDbContext _context;

    public AuthService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<(bool Success, string Message)> Signup(string firstname, string email, string password)
    {
      

       
        var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (existingUser != null)
        {
            return (false, "Email is already registered");
        }

       
        var user = new User
        {
            Firstname = firstname,
            Email = email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(password) 
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return (true, "User registered successfully");
    }

    public async Task<(bool Success, string Message)> Login(string email, string password)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
        {
            return (false, "Invalid email or password");
        }

        return (true, "Login successful");
    }
}