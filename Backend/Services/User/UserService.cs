using Backend.Models;
using Backend.Models.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Backend.Data;
using Backend.Services.UserService;
using Backend.Services.UserService.UserService;
using System.Text;

namespace Backend.Services.Service
{
    public class UserService : IUserService
    {

        public static User user = new User();
        //HttpClient httpClient = new HttpClient();

        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;

        /// <summary>
        /// get configuration access - config keys, data etc
        /// </summary>
        /// <param name="configuration"></param>
        /// <param name="context"></param>

        public UserService(IConfiguration configuration, ApplicationDbContext context)
        {
            _context = context;
            _configuration = configuration;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userDTO"></param>
        /// <returns></returns>

        [HttpPost("register")]
        public bool RegisterUser(UserDTO userDTO)
        {

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(userDTO.Password);
            var user = new User
            {
                Email = userDTO.Email,
                PasswordHash = passwordHash,
                Role = userDTO.Role.UserRole
            };
            _context.Add(user);
            _context.SaveChanges();

            return true;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="userDTO"></param>
        /// <returns></returns>

        public string Login(UserDTO userDTO)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == userDTO.Email);

            if (string.IsNullOrEmpty(userDTO.Password))
            {
                return "Hasło nie zostało wpisane";

            }
            if (user == null)
            {
                return "Użytkownik o podanym adresie e-mail nie istnieje.";
            }

            if (!VerifyPassword(userDTO.Password, user.PasswordHash))
            {
                return "Nieprawidłowe hasło.";
            }

            JwtSecurityToken token = CreateToken(user);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        /// <summary>
        /// Create JWT Token for the specified user
        /// </summary>
        /// <param name="userDTO">The user to create the token for</param>
        /// <returns>A JWT with the user's email and role claims encoded.</returns>


        public JwtSecurityToken CreateToken(User user)
        {
            var userRole = user.Role.ToString();
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, userRole)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                signingCredentials: creds,
                issuer: "https://localhost:3000",
                audience: "https://localhost:3000",
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1)
            );

            return token;
        }
      

        /// <summary>
        /// Verifies whether the given user password matches the specified hashed password.
        /// </summary>
        /// <param name="userPassword">The user's entered password.</param>
        /// <param name="PasswordHash">The hashed password to compare against.</param>
        /// <returns> <c>true</c> if the given password matches the specified hash; otherwise, <c>false</c>.</returns>

        public bool VerifyPassword(string userPassword, string PasswordHash)
        {
            if (userPassword == null)
            {
                return false;
            }
            else if (PasswordHash == null)
            {
                return false;
            }
            else
            {
                return BCrypt.Net.BCrypt.Verify(userPassword, PasswordHash);
            }

        }


    }
}
