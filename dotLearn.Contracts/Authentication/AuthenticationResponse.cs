using dotLearn.Domain.Data.Enum;
using dotLearn.Domain.Entities;

namespace dotLearn.Contracts.Authentication;
public record AuthenticationResponse(
        int id,
        string FirstName,
        string LastName,
        string Email,
        string Token
    );

