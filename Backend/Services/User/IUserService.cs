using Backend.Data.Enums;
using Backend.Models;
using Backend.Models.Dto;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace Backend.Services.UserService.UserService
{
    public interface IUserService
    {
        bool RegisterUser(UserDTO userDTO);
        string Login(UserDTO userDTO);
        public bool VerifyPassword(string userPassword, string PasswordHash);
        JwtSecurityToken CreateToken(User user);
    }
}
