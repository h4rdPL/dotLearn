using dotLearn.Application.Common.Interfaces.Authentication;
using dotLearn.Application.Services.Authentication;
using dotLearn.Contracts.Authentication;
using dotLearn.Domain.DTO;
using Microsoft.AspNetCore.Mvc;

namespace dotLearn.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public AuthenticationController(IAuthenticationService authenticationService, IJwtTokenGenerator jwtTokenGenerator, IHttpContextAccessor contextAccessor)
        {
            _authenticationService = authenticationService;
            _jwtTokenGenerator = jwtTokenGenerator;
            _httpContextAccessor = contextAccessor;
        }


        /// <summary>
        /// Registers a new user.
        /// </summary>
        /// <param name="userDTO">The data transfer object containing user registration information.</param>
        /// <returns>An asynchronous task that represents the HTTP response containing the authentication result.</returns>

        [HttpPost("register")]
        public async Task<ActionResult<AuthenticationResult>> Register(UserDTO userDTO)
        {
            var authResult = _authenticationService.Register(userDTO);
            var response = new AuthenticationResponse(authResult.user.Id, authResult.user.FirstName, authResult.user.LastName, authResult.user.Email, authResult.Token);
            return await Task.FromResult(Ok(response));
        }


        /// <summary>
        /// Logs in a user.
        /// </summary>
        /// <param name="request">The login request containing user credentials.</param>
        /// <returns>An asynchronous task that represents the HTTP response containing the authentication result.</returns>
        [HttpPost("login")]
        public async Task<ActionResult<AuthenticationResult>> Login(LoginRequest request)
        {
            var authResult = _authenticationService.Login(request);
            var response = new AuthenticationResponse(authResult.user.Id, authResult.user.FirstName, authResult.user.LastName, authResult.user.Email, authResult.Token);
            var jwt = _jwtTokenGenerator.GenerateToken(authResult.user);
            return await Task.FromResult(Ok(response));
        }
        /// <summary>
        /// Retrieves user information based on the provided JWT token.
        /// </summary>
        /// <returns>An HTTP response containing the user information.</returns>
        [HttpGet("user")]
        public IActionResult User()
        {
            var token = _httpContextAccessor.HttpContext.Request.Cookies["jwt"];
            _jwtTokenGenerator.Verify(token);

            var userResult = _authenticationService.User();
    
        if (userResult == null)
        {
            return BadRequest("Invalid or expired token");
        }
    
            return Ok(userResult);
        }

        /// <summary>
        /// Logs out a user by removing the JWT token from the response cookies.
        /// </summary>
        /// <returns>An HTTP response indicating the success of the logout operation.</returns>
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
