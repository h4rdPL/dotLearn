using dotLearn.Application.Common.Interfaces.Persisence;
using dotLearn.Application.Helpers;
using dotLearn.Application.Services.Authentication;
using dotLearn.Domain.Data.Enum;
using dotLearn.Domain.DTO;
using dotLearn.Domain.Entities;
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

        public void Add(User userDTO)
        {
            if (userDTO.Role == Role.Professor)
            {
                var professor = new Professor
                {
                    Id = userDTO.Id,
                    FirstName = userDTO.FirstName,
                    LastName = userDTO.LastName,
                    Email = userDTO.Email,
                    Password = PasswordHasher.EncryptPassword(userDTO.Password),
                    Role = Role.Professor,
                };

                _context.Professors.Add(professor);
                _context.SaveChanges();
            }
            else if (userDTO.Role == Role.Student)
            {
                // Create a Student object from the UserDTO
                var student = new Student
                {
                    FirstName = userDTO.FirstName,
                    LastName = userDTO.LastName,
                    Email = userDTO.Email,
                    Password = PasswordHasher.EncryptPassword(userDTO.Password),
                    Role = Role.Student,
                    CardId = 1
                };

                _context.Students.Add(student);
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

            return user;
        }

        public int ReturnIdOfUserByEmail(string email)
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

            return user.Id;
        }

        public User? GetUserById(int Id)
        {
            return _context.Students.FirstOrDefault(x => x.Id == Id);
        }

    }
}
