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
            var cardIdGenerator = new CardIdGenerator();
            var cardId = cardIdGenerator.GenerateCardIdInt();
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
                    CardId = cardId
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

            // Sprawdź rolę użytkownika i zwróć go w zależności od roli
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


        public int ReturnIdOfUserByEmail(string email)
        {
            var user = _context.Professors.SingleOrDefault(x => x.Email == email);

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

        public Student GetStudentByCardId(int CardId) 
        {
            return _context.Students.FirstOrDefault(x => x.CardId == CardId);
        }
    }
}
