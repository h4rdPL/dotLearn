using dotLearn.Application.Common.Interfaces.Authentication;
using dotLearn.Application.Common.Interfaces.Persisence;
using dotLearn.Domain.Data.Enum;
using dotLearn.Domain.Entities;
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
        private readonly IJwtTokenGenerator _jwtTokenGenerator;

        public AuthenticationService(IJwtTokenGenerator jwtTokenGenerator, IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _jwtTokenGenerator = jwtTokenGenerator;
        }
        public AuthenticationResult Register(string firstName, string lastName, string email, string password, Role role)
        {
            if (_userRepository.GetUserByEmail(email) is not null)
            {
                throw new Exception("Użytkownik o podanym adresie email już istnieje");
            }

            Guid id = Guid.NewGuid();
            User user = null; // Initialize the user variable with a default value

            if (role == Role.Student)
            {
                user = new User
                {
                    Id = id,
                    FirstName = firstName,
                    LastName = lastName,
                    Email = email,
                    Password = password,
                    Role = Role.Student
                };
            }
            else if (role == Role.Professor)
            {
                user = new User
                {
                    Id = id,
                    FirstName = firstName,
                    LastName = lastName,
                    Email = email,
                    Password = password,
                    Role = Role.Professor
                };
            }

            if (user is null)
            {
                throw new Exception("Invalid user role"); // Handle the case when the user role is neither Student nor Professor
            }

            _userRepository.Add(user);

            var token = _jwtTokenGenerator.GenerateToken(user);

            return new AuthenticationResult(user, token);
        }
        public AuthenticationResult Login(string email, string password)
        {
            // 1. Validate the user exists

            if (_userRepository.GetUserByEmail(email) is not User user)
            {
                throw new Exception("User with given Email does not exist");
            }
            // 2. Validate the password is correct
            if (user.Password != password)
            {
                throw new Exception("Invalid password");
            }
            // 3. Create Jwt Token
            var token = _jwtTokenGenerator.GenerateToken(user);
            return new AuthenticationResult(user, token);
        }

      

    }
}
