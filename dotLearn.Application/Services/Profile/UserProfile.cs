using dotLearn.Application.Common.Interfaces.Persisence;
using dotLearn.Domain.Data.Enum;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Infrastructure.Profile
{
    public class UserProfile 
    {


        [Authorize(Policy = "StudentPolicy")]
        public bool AddSubject(Subject subject, string role)
        {
            
            return true;
        }
    }
}
