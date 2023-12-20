namespace dotLearn.Application.Common.Interfaces.Authentication
{
    public interface IPasswordHasher
    {
        string Hash(string password);
        bool VerifyPassword(string passwordHash, string userPassword);
    }

}
