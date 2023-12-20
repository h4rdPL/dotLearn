using dotLearn.Domain.Data.Enum;
using Microsoft.AspNetCore.Authorization;

namespace dotLearn.Application.Common.Interfaces.Services.Profile
{
    public class UserProfile
    {

        /// <summary>
        /// 
        /// </summary>
        /// <param name="subject"></param>
        /// <param name="role"></param>
        /// <returns></returns>
        [Authorize(Policy = "StudentPolicy")]
        public bool AddSubject(Subject subject, string role)
        {
            return true;
        }
    }
}
