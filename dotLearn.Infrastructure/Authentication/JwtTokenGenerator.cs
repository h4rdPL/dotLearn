using dotLearn.Application.Common.Interfaces.Authentication;
using dotLearn.Application.Common.Interfaces.Persisence;
using dotLearn.Domain.Data.Enum;
using dotLearn.Domain.Entities;
using dotLearn.Infrastructure.Persistance;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

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

        public string GenerateToken(User user)
        {
            var secureKey = "My secret from application config";

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secureKey));
            var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256, "dsasdadsaa");

            // Tutaj dodaj "kid" (key identifier) do nagłówka
            var header = new JwtHeader(credentials);
            header.Add("kid", "your_key_identifier_here");

            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.GivenName, user.FirstName),
                new Claim(JwtRegisteredClaimNames.FamilyName, user.LastName),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("Id", user.Id.ToString()),
            };

            var payload = new JwtPayload(user.Id.ToString(), null, claims, null, DateTime.Today.AddDays(1));

            claims.Add(new Claim(ClaimTypes.Role, user.Role.ToString()));

            var securityToken = new JwtSecurityToken(header, payload);

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }

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
                // err
                var claimsPrincipal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var validatedToken);
                return (JwtSecurityToken)validatedToken;
            }
            catch (Exception ex)
            {
                // Tutaj możesz obsłużyć błędy walidacji tokena, np. logując je
                Console.WriteLine($"Błąd walidacji tokenu JWT: {ex.Message}");
                throw; // Możesz zdecydować, jak obsłużyć błąd walidacji
            }
        }

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
