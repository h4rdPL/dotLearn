using dotLearn.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Application.Common.Interfaces.Validation
{
    public interface IValidator
    {
        public bool  IsValidEmail(string email);
        public bool IsValidPassword(string password, User user);
    }
}
