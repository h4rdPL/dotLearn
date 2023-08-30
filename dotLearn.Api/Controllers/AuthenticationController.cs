using dotLearn.Application.Common.Interfaces.Authentication;
using dotLearn.Application.Common.Interfaces.Persisence;
using dotLearn.Application.Services.Authentication;
using dotLearn.Application.Services.Jobs;
using dotLearn.Contracts.Authentication;
using dotLearn.Domain.Data.Enum;
using dotLearn.Domain.DTO;
using dotLearn.Domain.Entities;
using dotLearn.Infrastructure.Persistance;
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
        private readonly IJobService _jobService;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public AuthenticationController(IAuthenticationService authenticationService, IJobService jobService, IJwtTokenGenerator jwtTokenGenerator, IHttpContextAccessor contextAccessor)
        {
            _jobService = jobService;
            _authenticationService = authenticationService;
            _jwtTokenGenerator = jwtTokenGenerator;
            _httpContextAccessor = contextAccessor;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthenticationResult>> Register(UserDTO userDTO)
        {
            var authResult = _authenticationService.Register(userDTO);
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
        [HttpGet("user")]
        public IActionResult User()
        {
            var jwt = _httpContextAccessor.HttpContext.Request.Cookies["jwt"];
            var token = _jwtTokenGenerator.Verify(jwt);

            var userResult = _authenticationService.User(token.Issuer);
    
        if (userResult == null)
        {
            return BadRequest("Invalid or expired token");
        }
    
            return Ok(userResult);
        }

        [HttpPost("logout")] 
        public IActionResult Logout()
        {
            _httpContextAccessor.HttpContext.Response.Cookies.Delete("jwt");
            return Ok(new
            {
                message = "success"
            });

        }
    }
}
