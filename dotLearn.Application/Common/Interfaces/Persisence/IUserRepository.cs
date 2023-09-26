using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using dotLearn.Domain.DTO;
using dotLearn.Domain.Entities;
namespace dotLearn.Application.Common.Interfaces.Persisence
{
    public interface IUserRepository
    {
        User GetUserByEmail(string email);
        void Add(User user);
        User? GetUserById(int id);
        Student? GetStudentById(int id);
        Student GetStudentByCardId(int CardId);
        User? ReturnIdOfUserByEmail(string email);
        List<Student> GetStudentByClassId(int classId);

    }
}
