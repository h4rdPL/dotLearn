using dotLearn.Application.Common.Interfaces.Authentication.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Application.Services.Authentication
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IUserRepository _userRepository;
        public AuthenticationResult Login(string email, string password)
        {
            // 1. Validate the user exists

            // 2. Validate the password is correct

            throw new NotImplementedException();
        }

        public AuthenticationResult Register(string firstName, string lastName, string email, string password)
        {
            // 1. Validate the user doesn't exist

            // 2. Create user (generate unique ID) & Persist to DV

            // create JWT Token

            throw new NotImplementedException();
        }
    }
}
