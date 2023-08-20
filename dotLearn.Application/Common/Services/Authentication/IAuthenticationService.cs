using dotLearn.Domain.Data.Enum;
using dotLearn.Domain.Entities;
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
        AuthenticationResult Register(int id, string firstName, string lastName, string email, string password, Role role);
        AuthenticationResult Login(string email, string password);
    }
}
