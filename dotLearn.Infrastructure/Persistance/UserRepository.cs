using dotLearn.Application.Common.Interfaces.Persisence;
using dotLearn.Application.Helpers;
using dotLearn.Application.Services.Authentication;
using dotLearn.Domain.Data.Enum;
using dotLearn.Domain.DTO;
using dotLearn.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Infrastructure.Persistance
{
    public class UserRepository : IUserRepository
    {
        private readonly DotLearnDbContext _context;
        public UserRepository(DotLearnDbContext context)
        {
            _context = context;
        }

        public void Add(User user)
        {
            if (user.Role == Role.Professor)
            {
                _context.Professors.Add((Professor)user);
                _context.SaveChanges();
            }
            else if (user.Role == Role.Student)
            {
                _context.Students.Add((Student)user);
                _context.SaveChanges();
            }
        }


        public Student? GetStudentById(int Id)
        {
            return _context.Students.SingleOrDefault(x => x.Id == Id);
        }

        public User GetUserByEmail(string email)
        {
            var user = _context.Students.SingleOrDefault(x => x.Email == email);
            if (user == null)
            {
                Console.WriteLine($"Nie znaleziono użytkownika o adresie e-mail: {email}");
            }
            else
            {
                Console.WriteLine($"Znaleziono użytkownika o adresie e-mail: {email}, Id: {user.Id}");
            }

            if (user != null && user.Role == Role.Student)
            {
                return user; 
            }
            else
            {
                var secondUser = _context.Professors.SingleOrDefault(x => x.Email == email);
                if (secondUser != null)
                {
                    Console.WriteLine($"Znaleziono użytkownika o adresie e-mail: {email}, Id: {secondUser.Id}");
                }
                return secondUser; 
            }
        }


        public User? ReturnIdOfUserByEmail(string email)
        {
            var student = _context.Students.SingleOrDefault(x => x.Email == email);
            if (student != null)
            {
                Console.WriteLine($"Znaleziono studenta o adresie e-mail: {email}, Id: {student.Id}");
                return student;
            }

            var professor = _context.Professors.SingleOrDefault(x => x.Email == email);
            if (professor != null)
            {
                Console.WriteLine($"Znaleziono profesora o adresie e-mail: {email}, Id: {professor.Id}");
                return professor;
            }

            Console.WriteLine($"Nie znaleziono użytkownika o adresie e-mail: {email}");
            return null;

        }

        public User? GetUserById(int Id)
        {
            var student = _context.Students.SingleOrDefault(x => x.Id == Id);
            if (student != null)
            {
                Console.WriteLine($"Znaleziono studenta o adresie e-mail: {Id}, Id: {student.Id}");
                return student;
            }

            var professor = _context.Professors.SingleOrDefault(x => x.Id == Id);
            if (professor != null)
            {
                Console.WriteLine($"Znaleziono profesora o adresie e-mail: {Id}, Id: {professor.Id}");
                return professor;
            }

            Console.WriteLine($"Nie znaleziono użytkownika o adresie e-mail: {Id}");
            return null;
        }

        public Student GetStudentByCardId(int CardId) 
        {
            return _context.Students.FirstOrDefault(x => x.CardId == CardId);
        }

        public List<Student> GetStudentByClassId(int classId)
        {
            var studentsInClass = (from ce in _context.Classes
                                   join ces in _context.ClassEntitiesStudents
                                   on ce.Id equals ces.ClassEntitiesId
                                   where ce.Id == classId
                                   select ces.Student)
                                   .ToList();

            return studentsInClass;
        }

    }
}
