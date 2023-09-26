using dotLearn.Application.Common.Interfaces.Authentication;
using dotLearn.Application.Common.Interfaces.Persisence;
using dotLearn.Application.Common.Interfaces.Test;
using dotLearn.Application.Helpers;
using dotLearn.Domain.DTO;
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
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly IUserRepository _userRepository;
        public TestRepository(DotLearnDbContext context, IJwtTokenGenerator jwtTokenGenerator, IUserRepository userRepository)
        {
            _context = context;
            _jwtTokenGenerator = jwtTokenGenerator;
            _userRepository = userRepository;
        }

        public TestClass Create(TestDTO testClass)
        {
            var professorId = _jwtTokenGenerator.GetProfessorIdFromJwt();
            var professor = _context.Professors.FirstOrDefault(p => p.Id == professorId.Id);
            var professorClass = _context.Classes.FirstOrDefault(c => c.ProfessorId == professorId.Id);

            if (professorClass is null)
            {
                Console.WriteLine("Professor is not assigned to any class.");
            }

            var test = new TestClass
            {
                TestName = testClass.TestName,
                Time = testClass.Time,
                IsActive = testClass.IsActive,
                ActiveDate = testClass.ActiveDate,
                ClassId = professorClass.Id,
                Questions = testClass.Questions
                .Select(questionDTO => new Question
                {
                    QuestionName = questionDTO.QuestionName,
                    Answers = questionDTO.Answers
                    .Select(answerDTO => new Answer
                    {
                        AnswerName = answerDTO.AnswerName,
                        IsCorrect = answerDTO.IsCorrect,
                    }).ToList(), 
                }).ToList(), 
            };

            _context.Tests.Add(test); 
            _context.SaveChanges();

            return test;
        }

        public List<TestDTO> GetTest(User user)
        {
            var testsWithProfessors = _context.Tests
                 .Where(test => test.Class.ProfessorId == user.Id)
                 .Include(test => test.Class.Professor) // Załaduj profesora klasy
                 .Select(test => new TestDTO
                 {
                     TestName = test.TestName,
                     Time = test.Time,
                     IsActive = test.IsActive,
                     ActiveDate = test.ActiveDate,
                     ClassId = test.ClassId,
                     ProfessorFirstName = test.Class.Professor.FirstName, // Imię profesora klasy
                     ProfessorLastName = test.Class.Professor.LastName,   // Nazwisko profesora klasy
                     Questions = test.Questions
                 })
                 .ToList();

            return testsWithProfessors;

            //var testsWithProfessors = (
            //    from ces in _context.ClassEntitiesStudents
            //    where ces.StudentId == user.Id
            //    join ce in _context.Classes
            //        on ces.ClassEntitiesId equals ce.Id
            //    join test in _context.Tests
            //        on ce.Id equals test.ClassId
            //    select new
            //    {
            //        Test = test,
            //        Professors = ce.Professor
            //    }
            //)
            //.Include(item => item.Test.Questions)
            //.ThenInclude(question => question.Answers)
            //.ToList();

            //// Możesz przekształcić wynik na odpowiednią strukturę, np. List<TestClass>
            //var testList = testsWithProfessors.Select(item => new TestClass
            //{
            //    Class = item.Test.Class, // Przypisz odpowiednie dane z testu
            //    Questions = item.Test.Questions,
            //    TestName = item.Test.TestName
            //}).ToList();


            //return testList;


        }

        public async Task OpenTestsOnActiveDateAsync()
        {
                var currentDate = DateTime.UtcNow;

                var testsToOpen = _context.Tests
                    .Where(test => test.ActiveDate <= currentDate && !test.IsActive)
                    .ToList();

                foreach (var test in testsToOpen)
                {
                    test.IsActive = true;
                }

                await _context.SaveChangesAsync();
        }
    }
}
