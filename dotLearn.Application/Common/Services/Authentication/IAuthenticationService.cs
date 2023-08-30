using dotLearn.Domain.Data.Enum;
using dotLearn.Domain.DTO;
using dotLearn.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static dotLearn.Domain.Entities.Student;

namespace dotLearn.Application.Services.Authentication
{
    public interface IAuthenticationService
    {
        AuthenticationResult Register(UserDTO userDTO);
        AuthenticationResult Login(string email, string password);
        User User(string token); 
    }
}
