using Backend.Models;
using Backend.Models.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Xml.Linq;
using Microsoft.AspNetCore.Authorization;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Security.Claims;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public static User user = new User();
        HttpClient httpClient = new HttpClient();

        private readonly IConfiguration _configuration;



        // get configuration access - config keys, data etc
        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        /// <summary>
        /// This method allows user to register
        /// </summary>
        /// <param name="userDTO"></param>
        /// <returns></returns>
        [HttpPost("register")]
        public ActionResult Register (UserDTO userDTO)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("Zle dane do rejestracji...");
            }

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(userDTO.Password);
            user.Email = userDTO.Email;
            user.PasswordHash = passwordHash;
            user.Role = userDTO.Role;
            return Ok(user);
        }
        /// <summary>
        /// This method allows user to login
        /// </summary>
        /// <param name="userDTO"></param>
        /// <returns></returns>
        /// 

        [HttpPost("Login")]
        public ActionResult Login (UserDTO userDTO)
        {
            if (user.Email != userDTO.Email)
            {
                return BadRequest("Został wpisany zły adres Email");
            } else if(!VerifyPassword(userDTO.Password, user.PasswordHash))
            {
                return BadRequest("Zostało wpisane złe hasło");
            }
                string token = CreateToken(user);
                return Ok(token);
        }
        /// <summary>
        /// JWT Token
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        private string CreateToken(User user)
        {
            var userRole = user.Role.UserRole.ToString(); // Get the user role as a string from the enum

            var claims = new ClaimsIdentity(new[] {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, userRole), // Add the user role as a claim

            });
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                    claims: claims.Claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: cred
                );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }

        private bool VerifyPassword(string userPassword, string PasswordHash) 
        {
            bool isMatch = BCrypt.Net.BCrypt.Verify(userPassword, PasswordHash);
            return isMatch;
        }

    }
}
