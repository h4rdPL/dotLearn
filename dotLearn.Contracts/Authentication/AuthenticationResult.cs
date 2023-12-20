using dotLearn.Domain.Entities;

namespace dotLearn.Application.Services.Authentication
{
    public record AuthenticationResult(
        User user,
        string Token
    );
}
