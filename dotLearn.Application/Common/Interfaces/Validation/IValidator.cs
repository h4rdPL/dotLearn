using dotLearn.Domain.Entities;

namespace dotLearn.Application.Common.Interfaces.Validation
{
    public interface IValidator
    {
        public bool IsValidEmail(string email);
        public bool IsValidPassword(string password, User user);
    }
}
