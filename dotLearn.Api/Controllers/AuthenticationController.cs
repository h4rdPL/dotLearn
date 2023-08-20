using dotLearn.Application.Common.Interfaces.Persisence;
using dotLearn.Application.Services.Authentication;
using dotLearn.Application.Services.Jobs;
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
        private readonly IJobService _jobService;
        public AuthenticationController(IAuthenticationService authenticationService, IUserRepository userRepository, IJobService jobService)
        {
            _jobService = jobService;
            _userRepository = userRepository;
            _authenticationService = authenticationService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthenticationResult>> Register(
            int id,
            string FirstName,
            string LastName,
            string Email,
            string Password,
            Role Role
            )
        {
            var authResult = _authenticationService.Register(id, FirstName, LastName, Email, Password, Role);
            var response = new AuthenticationResponse(authResult.user.Id, authResult.user.FirstName, authResult.user.LastName, authResult.user.Email, authResult.Token);
            return await Task.FromResult(Ok(response));
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthenticationResult>> Login(LoginRequest request)
        {
            var authResult = _authenticationService.Login(request.Email, request.Password);
            var response = new AuthenticationResponse(authResult.user.Id, authResult.user.FirstName, authResult.user.LastName, authResult.user.Email, authResult.Token);
            return await Task.FromResult(Ok(response));
        }
    }
}
