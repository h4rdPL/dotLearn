using dotLearn.Contracts.Authentication;
using dotLearn.Domain.DTO;
using dotLearn.Domain.Entities;

namespace dotLearn.Application.Services.Authentication
{
    public interface IAuthenticationService
    {
        AuthenticationResult Register(UserDTO userDTO);
        AuthenticationResult Login(LoginRequest request);
        User User(); 
    }
}
