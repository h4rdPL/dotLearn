using dotLearn.Application.Common.Interfaces.Persisence;
using dotLearn.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Application.Common.Interfaces.Authentication
{
    public class UserRepository : IUserRepository
    {
        private static readonly List<User> _users = new();
        private static readonly List<Student> _students = new();
        public void Add(User user)
        {
            _users.Add(user);
        }

        public Student? GetStudentById(int id)
        {
            return _students.SingleOrDefault(u => u.Id == id);
        }

        public User? GetUserByEmail(string email)
        {
            return _users.SingleOrDefault(u => u.Email == email);
        }
        public User? GetUserById(int Id)
        {
            return _users.SingleOrDefault(u => u.Id == Id);
        }
    }
}
