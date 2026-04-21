using Microsoft.AspNetCore.Mvc;
using System.Net.Cache;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    
    
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
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
        var (success, message) = await _authService.Login(request.Email, request.Password);

        if (!success)
        {
            return BadRequest(new { message });
        }

        return Ok(new { message = "Login successful" });
    }
}