using dotLearn.Application.Common.Interfaces.Validation;
using dotLearn.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace dotLearn.Infrastructure.Validation
{
    public class Validator : IValidator
    {
        public bool IsValidEmail(string email)
        {
            if (string.IsNullOrEmpty(email))
            { 
                return false;
            }

            try
            {
                string regExpression = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
                return Regex.IsMatch(email, regExpression, RegexOptions.IgnoreCase);
            }
            
            catch (RegexMatchTimeoutException)
            {
                return false;

            }
        }

        public bool IsValidPassword(string password, User user)
        {
            if (password == null )
            {
                return false;
            } else if (password != user.Password)
            {
                return false;
            }
            return true;
        }
    }
}
