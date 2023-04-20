using Backend.Models;
using Backend.Models.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public static User user = new User();
        private readonly IConfiguration _configuration;

        // get configuration access - config keys, data etc
        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userDTO"></param>
        /// <returns></returns>
        [HttpPost("register")]
        public ActionResult Register (UserDTO userDTO)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("Złe dane do rejestracji...");
            }

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(userDTO.Password);

            user.Email = userDTO.Email;
            user.PasswordHash = passwordHash;
            user.Role = userDTO.Role;

            return Ok(user);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="userDTO"></param>
        /// <returns></returns>
        
        [HttpPost("Login")]
        public async Task<IActionResult> Login (UserDTO userDTO)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("Nieprawidłowe dane logowania");
            }
            return Ok("Zalogowano");
        }

    }
}
