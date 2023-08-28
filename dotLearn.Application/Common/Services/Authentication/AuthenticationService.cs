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
using dotLearn.Application.Helpers;
using dotLearn.Domain.DTO;

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
        /// <summary>
        /// Registers a user, either as a Student or a Professor.
        /// </summary>
        /// <param name="id">User ID</param>
        /// <param name="firstName">User's first name</param>
        /// <param name="lastName">User's last name</param>
        /// <param name="email">User's email</param>
        /// <param name="password">User's password</param>
        /// <param name="role">User's role - Student or Professor</param>
        /// <returns>Authentication result containing user and JWT token</returns>
        /// <exception cref="Exception">Thrown when an invalid email or password is provided</exception>
        public AuthenticationResult Register(UserDTO userDTO)
        {
            if (_userRepository.GetUserByEmail(userDTO.Email) is not null)
            {
                throw new Exception("A user with the provided email address already exists");
            }
            //else if (!_validator.IsValidEmail(userDTO.Email))
            //{
            //    throw new Exception("The provided email address is not properly formatted");
            //}

            User user = null;

            if (userDTO.Role == Role.Student)
            {
                var cardIdGenerator = new CardIdGenerator();
                var cardId = cardIdGenerator.GenerateCardId();
                user = new Student
                {
                    Id = userDTO.Id,
                    FirstName = userDTO.FirstName,
                    LastName = userDTO.LastName,
                    Email = userDTO.Email,
                    Password = PasswordHasher.EncryptPassword(userDTO.Password),
                    Role = Role.Student,
                    CardId = cardId
                };
            }
            else if (userDTO.Role == Role.Professor)
            {
                user = new Professor
                {
                    Id = userDTO.Id,
                    FirstName = userDTO.FirstName,
                    LastName = userDTO.LastName,
                    Email = userDTO.Email,
                    Password = PasswordHasher.EncryptPassword(userDTO.Password),
                    Role = Role.Professor,
                };
            }

            if (user is null)
            {
                throw new Exception("The provided role does not exist");
            }

            _userRepository.Add(user);

            var token = _jwtTokenGenerator.GenerateToken(user);

            return new AuthenticationResult(user, token);
        }

        /// <summary>
        /// Logs in a user.
        /// </summary>
        /// <param name="email">User's email</param>
        /// <param name="password">User's password</param>
        /// <returns>Authentication result containing user and JWT token</returns>
        /// <exception cref="Exception">Thrown when the user email or password is incorrect</exception>
        public AuthenticationResult Login(string email, string password)
        {
            // 1. Validate if the user exists
            if (_userRepository.GetUserByEmail(email) is not User user)
            {
                throw new Exception("A user with the provided email address does not exist");
            }

            // 2. Validate if the password is correct
            if (!PasswordHasher.VerifyPassword(password, user.Password))
            {
                throw new Exception("The provided password is incorrect");
            }

            // 3. Create a JWT Token
            var token = _jwtTokenGenerator.GenerateToken(user);
            return new AuthenticationResult(user, token);
        }
    }
}
