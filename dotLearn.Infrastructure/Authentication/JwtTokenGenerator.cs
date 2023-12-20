using dotLearn.Application.Common.Interfaces.Authentication;
using dotLearn.Application.Common.Interfaces.Persisence;
using dotLearn.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace dotLearn.Infrastructure.Authentication
{
    public class JwtTokenGenerator : IJwtTokenGenerator
    {
        private readonly JwtSettings _jwtSettings;
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _contextAccessor;

        public JwtTokenGenerator(IOptions<JwtSettings> jwtSettings, IUserRepository userRepository, IHttpContextAccessor httpContextAccessor)
        {
            _jwtSettings = jwtSettings.Value;
            _contextAccessor = httpContextAccessor;
            _userRepository = userRepository;
        }

        /// <summary>
        /// Generates a JWT (JSON Web Token) for the provided user.
        /// </summary>
        /// <param name="user">The user for whom the JWT is generated.</param>
        /// <returns>A string representing the generated JWT.</returns>
        public string GenerateToken(User user)
        {
            var secureKey = "My secret from application config";

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secureKey));
            var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256, "dsasdadsaa");

            var header = new JwtHeader(credentials);
            header.Add("kid", "your_key_identifier_here");

            var claims = new List<Claim>
            {
                new Claim("id", user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.GivenName, user.FirstName),
                new Claim(JwtRegisteredClaimNames.FamilyName, user.LastName),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("role", user.Role.ToString()),
            };

            var payload = new JwtPayload(user.Id.ToString(), null, claims, null, DateTime.Today.AddDays(1));

            claims.Add(new Claim(ClaimTypes.Role, user.Role.ToString()));

            var securityToken = new JwtSecurityToken(header, payload);

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }

        /// <summary>
        /// Verifies the provided JWT token and returns the corresponding JWT security token.
        /// </summary>
        /// <param name="token">The JWT token to be verified.</param>
        /// <returns>The verified JWT security token.</returns>
        public JwtSecurityToken Verify(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("My secret from application config");

            var tokenValidationParameters = new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false
            };

            try
            {
                var claimsPrincipal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var validatedToken);
                return (JwtSecurityToken)validatedToken;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Błąd walidacji tokenu JWT: {ex.Message}");
                throw; 
            }
        }

        /// <summary>
        /// Retrieves the user associated with the professor's JWT token from the HTTP request headers.
        /// </summary>
        /// <returns>The user associated with the JWT token, or null if not found.</returns>
        public User? GetProfessorIdFromJwt()
        {
            var jwtToken = _contextAccessor.HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", string.Empty);
            var jwtSecurityToken = Verify(jwtToken);
            var professorEmailClaim = jwtSecurityToken.Claims.First(c => c.Type == "email").Value;
            var user = _userRepository.GetUserByEmail(professorEmailClaim);

            return user;
        }




    }
}
