using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Contracts.Authentication
{
    public record struct LoginRequest(
            string Email, 
            string Password
        );
}
