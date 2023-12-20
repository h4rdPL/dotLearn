namespace dotLearn.Contracts.Authentication
{
    public record struct LoginRequest(
            string Email, 
            string Password
        );
}
