using dotLearn.Application.Common.Interfaces.Authentication;
using dotLearn.Application.Common.Interfaces.Persisence;
using dotLearn.Application.Common.Interfaces.Test;
using dotLearn.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Infrastructure.Test
{
    public class TestRepository : ITestRepository
    {
        private readonly DotLearnDbContext _context;
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        public TestRepository(DotLearnDbContext context, IUserRepository userRepository, IHttpContextAccessor contextAccessor, IJwtTokenGenerator jwtTokenGenerator)
        {
            _context = context;
            _userRepository = userRepository;
            _jwtTokenGenerator = jwtTokenGenerator;
            _contextAccessor = contextAccessor;
        }

        public TestClass Create(TestClass testClass)
        {
            var jwtToken = _contextAccessor.HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", string.Empty);
            var jwtSecurityToken = _jwtTokenGenerator.Verify(jwtToken);
            var professorEmailClaim = jwtSecurityToken.Claims.First(c => c.Type == "email").Value;
            var professorId = _userRepository.ReturnIdOfUserByEmail(professorEmailClaim);
            // Pobierz profesora na podstawie identyfikatora
            var professor = _context.Professors.FirstOrDefault(p => p.Id == professorId);

            testClass.Professor = professor;

            // Znajdź klasę przypisaną do tego samego profesora
            var professorClass = _context.Classes.FirstOrDefault(c => c.ProfessorId == professorId);

            // Znajdź studentów, którzy należą do tej klasy
            var studentsInProfessorClass = _context.ClassEntitiesStudents
                .Where(cs => cs.ClassEntitiesId == professorClass.Id)
                .Select(cs => cs.Student)
                .ToList();

            // Odłącz obiekty studentów od kontekstu bazy danych
            foreach (var student in studentsInProfessorClass)
            {
                _context.Entry(student).State = EntityState.Detached;
            }

            // Odłącz obiekt klasy od kontekstu bazy danych
            _context.Entry(professorClass).State = EntityState.Detached;

            // Teraz możesz dodać testClass do kontekstu bazy danych
            _context.Tests.Add(testClass);

            Console.WriteLine(testClass.Students);
            _context.SaveChanges();

            return testClass;
        }





    }
}
