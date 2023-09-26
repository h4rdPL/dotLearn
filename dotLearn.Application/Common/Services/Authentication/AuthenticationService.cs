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
using System.Web.Http.Results;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

using Microsoft.AspNetCore.Authorization;
namespace dotLearn.Application.Services.Authentication
{
    public partial class AuthenticationService : IAuthenticationService
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly IValidator _validator;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthenticationService(IJwtTokenGenerator jwtTokenGenerator, IValidator validator, IUserRepository userRepository, IHttpContextAccessor httpContextAccessor)
        {
            _userRepository = userRepository;
            _jwtTokenGenerator = jwtTokenGenerator;
            _validator = validator;
            _httpContextAccessor = httpContextAccessor;
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

            User user = null;

            if (userDTO.Role == Role.Student)
            {
                var cardIdGenerator = new CardIdGenerator();
                var cardId = cardIdGenerator.GenerateCardIdInt();
                user = new Student
                {
                    // Id zostawiamy takie, jakie jest nadane przez bazę danych
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
                    // Tak samo, Id pozostawiamy bez zmian
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

            // Dodaj użytkownika do bazy danych
            _userRepository.Add(user);

            var token = _jwtTokenGenerator.GenerateToken(user);

            // Wygeneruj token JWT z prawidłowym ID użytkownika

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
            var user = _userRepository.GetUserByEmail(email);

            // 1. Validate if the user exists
            if (user is null)
            {
                throw new Exception("Invalid Credentials");
            }

            // 2. Validate if the password is correct
            if (PasswordHasher.VerifyPassword(password, user.Password))
            {
                throw new Exception("The provided password is incorrect");
            }
            
            // 3. Create a JWT Token
            var token = _jwtTokenGenerator.GenerateToken(user);

            _httpContextAccessor.HttpContext.Response.Cookies.Append("jwt", token, new CookieOptions
            {
                HttpOnly = true
            });

            return new AuthenticationResult(user, token);
        }

        public User User()
        {
            var jwt = _httpContextAccessor.HttpContext.Request.Cookies["jwt"];
            var token = _jwtTokenGenerator.Verify(jwt);

            var emailClaim = token.Claims.FirstOrDefault(claim => claim.Type == "email");

            if (emailClaim != null)
            {
                string userEmail = emailClaim.Value;

                var user = _userRepository.GetUserByEmail(userEmail);

                if (user != null)
                {
                    return user;
                }
            }

            return null;
        }


    }
}
