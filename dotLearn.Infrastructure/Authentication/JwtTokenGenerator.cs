using dotLearn.Application.Common.Interfaces.Authentication;
using dotLearn.Domain.Data.Enum;
using dotLearn.Domain.Entities;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
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

        public JwtTokenGenerator(IOptions<JwtSettings> jwtSettings)
        {
            _jwtSettings = jwtSettings.Value;
        }

        public string GenerateToken(User user)
        {
            var signingCredentials = new SigningCredentials(
     new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret)),
     SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.GivenName, user.FirstName),
                new Claim(JwtRegisteredClaimNames.FamilyName, user.LastName),
                new Claim(JwtRegisteredClaimNames.UniqueName, Guid.NewGuid().ToString()),
            };

            // Add the "role" claim using the correct claim type
            claims.Add(new Claim(ClaimTypes.Role, user.Role.ToString()));

            var securityToken = new JwtSecurityToken(
                issuer: "dotLearn",
                audience: "dotLearn",
                expires: DateTime.UtcNow.AddMinutes(60),
                signingCredentials: signingCredentials,
                claims: claims
            );

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }
    }
}
