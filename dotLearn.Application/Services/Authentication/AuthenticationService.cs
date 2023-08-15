using dotLearn.Application.Common.Interfaces.Authentication;
using dotLearn.Application.Common.Interfaces.Persisence;
using dotLearn.Application.Common.Interfaces.Validation;
using dotLearn.Domain.Data.Enum;
using dotLearn.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using static dotLearn.Domain.Entities.Student;

namespace dotLearn.Application.Services.Authentication
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly IValidator _validator;

        public AuthenticationService(IJwtTokenGenerator jwtTokenGenerator, IValidator validator, IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _jwtTokenGenerator = jwtTokenGenerator;
            _validator = validator; 
        }

        public AuthenticationResult Register(int id, string firstName, string lastName, string email, string password, Role role)
        {
            if (_userRepository.GetUserByEmail(email) is not null)
            {
                throw new Exception("Użytkownik o podanym adresie email już istnieje");
            } 
            else if (!_validator.IsValidEmail(email))
            {
                throw new Exception("Podany adres email jest niepoprawnie skonstruowany");
            }

       
            User user = null; 

            if (role == Role.Student)
            {
                var cardIdGenerator = new CardIdGenerator();
                var cardId = cardIdGenerator.GenerateCardId();
                user = new Student
                {
                    Guid = Guid.NewGuid(),
                    FirstName = firstName,
                    LastName = lastName,
                    Email = email,
                    Password = password,
                    Role = Role.Student,
                    CardId = cardId 
                };
            }
            else if (role == Role.Professor)
            {
                user = new Professor
                {
                    Guid = Guid.NewGuid(),
                    FirstName = firstName,
                    LastName = lastName,
                    Email = email,
                    Password = password,
                    Role = Role.Professor,
                };
            }

            if (user is null)
            {
                throw new Exception("Rola, która została podana, nie istnieje");
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
                throw new Exception("Użytkownik o podanym adresie email nie istnieje");
            }

            // 2. Validate the password is correct
            if (!_validator.IsValidPassword(password, user))
            {
                throw new Exception("Hasło jest niepoprawne");
            }

            // 3. Create Jwt Token
            var token = _jwtTokenGenerator.GenerateToken(user);
            return new AuthenticationResult(user, token);
        }


    }
}
