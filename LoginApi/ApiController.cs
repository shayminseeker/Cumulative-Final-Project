using Microsoft.AspNetCore.Mvc;
using System.Net.Cache;
using System.Linq;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    private readonly AppDbContext _context;

    public AuthController(AuthService authService, AppDbContext context)
    {
        _authService = authService;
        _context = context;
    }

    [HttpPost("signup")]
    public async Task<IActionResult> Signup([FromBody] SignupRequest request)
    {
        var (success, message) = await _authService.Signup(request.Firstname, request.Email, request.Password);

        if (!success)
        {
            return BadRequest(new { message });
        }

        return Ok(new { message = "User registered successfully" });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var (success, message, firstname, email, role) = await _authService.Login(request.Email, request.Password);

        if (!success)
        {
            return BadRequest(new { message });
        }

        return Ok(new { message = "Login successful", firstname, email, role });
    }

    [HttpGet("users")]
    public IActionResult GetUsers()
    {
        var users = _context.Users
            .Select(u => new { u.Firstname, u.Email, u.Role })
            .ToList();

        return Ok(users);
    }
}