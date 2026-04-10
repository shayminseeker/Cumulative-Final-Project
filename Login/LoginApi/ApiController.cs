using Microsoft.AspNetCore.Mvc;
using System.Net.Cache;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    [HttpPost("signup")]
    public IActionResult Signup([FromBody] SignupRequest request)
    {
        {
            if (string.IsNullOrWithSpace(request.Email))
            {
                return BadRequest(new {message = "Email is required"});

            }

            if (string.IsNullOrWithSpace(request.Password))
            {
                return BadRequest(new {message = "Password is required"});

            }
            
            if(!request.Email.Contains("@"))
            {
                return BadRequest(new {message = "Invalid email format"});
            }

            if(request.Password.Length < 6)
            {
                return BadRequest(new {message = "Password must be at least 6 characters long"});
            }
        }
    
        return Ok(new{ message = "Validated"}
);
    }
}