using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using dotLearn.Domain.Entities;
namespace dotLearn.Application.Common.Interfaces.Persisence
{
    public interface IUserRepository
    {
        User? GetUserByEmail(string email);
        void Add(User user);
        User? GetUserById(Guid id);

    }
}
