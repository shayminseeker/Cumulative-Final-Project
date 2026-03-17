using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("Login/[controller]")]
public class AuthController : ControllerBase

{
    [HttpPost("register")]
    public IActionResult Register(RegisterDto dto)
    {
        return Ok();
    }

    [HttpPost("login")]
    public IActionResult Login(LoginDto dto)
    {
        return Ok();
    }

}