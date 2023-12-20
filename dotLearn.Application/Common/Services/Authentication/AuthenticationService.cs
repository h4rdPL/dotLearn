using dotLearn.Application.Common.Interfaces.Authentication;
using dotLearn.Application.Common.Interfaces.Persisence;
using dotLearn.Application.Helpers;
using dotLearn.Contracts.Authentication;
using dotLearn.Domain.Data.Enum;
using dotLearn.Domain.DTO;
using dotLearn.Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace dotLearn.Application.Services.Authentication
{
    public partial class AuthenticationService : IAuthenticationService
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IPasswordHasher _passwordHasher;
        public AuthenticationService(IJwtTokenGenerator jwtTokenGenerator, IUserRepository userRepository, IHttpContextAccessor httpContextAccessor, IPasswordHasher passwordHasher)
        {
            _userRepository = userRepository;
            _jwtTokenGenerator = jwtTokenGenerator;
            _httpContextAccessor = httpContextAccessor;
            _passwordHasher = passwordHasher;
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
            var password = _passwordHasher.Hash(userDTO.Password);

            if (userDTO.Role == Role.Student)
            {
                var cardIdGenerator = new CardIdGenerator();
                var cardId = cardIdGenerator.GenerateCardIdInt();
                user = new Student
                {
                    FirstName = userDTO.FirstName,
                    LastName = userDTO.LastName,
                    Email = userDTO.Email,
                    Password = password, 
                    Role = Role.Student,
                    CardId = cardId
                };
            }
            else if (userDTO.Role == Role.Professor)
            {
                user = new Professor
                {
                    FirstName = userDTO.FirstName,
                    LastName = userDTO.LastName,
                    Email = userDTO.Email,
                    Password = password, 
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
        public AuthenticationResult Login(LoginRequest request)
        {
            var user = _userRepository.GetUserByEmail(request.Email);

            if (user is null)
            {
                throw new Exception("Invalid Credentials");
            }

            var result = _passwordHasher.VerifyPassword(user.Password, request.Password);

            if (!result)
            {
                throw new Exception("Invalid Credentials pass");

            }

            var token = _jwtTokenGenerator.GenerateToken(user);

            _httpContextAccessor.HttpContext.Response.Cookies.Append("jwt", token, new CookieOptions
            {
                HttpOnly = true
            });

            return new AuthenticationResult(user, token);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
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
