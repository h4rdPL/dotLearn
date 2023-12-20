using dotLearn.Domain.Entities;
using System.IdentityModel.Tokens.Jwt;

namespace dotLearn.Application.Common.Interfaces.Authentication
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(User user);
        JwtSecurityToken Verify(string jwtToken);
        User GetProfessorIdFromJwt();
    }
}
