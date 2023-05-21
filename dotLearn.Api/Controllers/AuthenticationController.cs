using dotLearn.Application.Common.Interfaces.Persisence;
using dotLearn.Application.Services.Authentication;
using dotLearn.Contracts.Authentication;
using dotLearn.Domain.Data.Enum;
using dotLearn.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace dotLearn.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {

        private readonly IAuthenticationService _authenticationService;
        private readonly IUserRepository _userRepository;
        public AuthenticationController(IAuthenticationService authenticationService, IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _authenticationService = authenticationService;
        }

        [HttpPost("register")]
        public IActionResult Register(string FirstName,
            string LastName,
            string Email,
            string Password,
            Role Role
            )
        {
            var authResult = _authenticationService.Register(FirstName, LastName, Email, Password, Role);
            var response = new AuthenticationResponse(authResult.user.Id, authResult.user.FirstName, authResult.user.LastName, authResult.user.Email, authResult.Token);
            return Ok(response);
        }

        [HttpPost("login")] 
        public IActionResult Login(LoginRequest request)
        {
            var authResult = _authenticationService.Login(request.Email, request.Password);
            var response = new AuthenticationResponse(authResult.user.Id, authResult.user.FirstName, authResult.user.LastName, authResult.user.Email, authResult.Token);
            return Ok(response);
        }
    }
}
