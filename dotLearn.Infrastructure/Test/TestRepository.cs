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

        public TestDTO Create(TestDTO testClass)
        {
            var professorId = _jwtTokenGenerator.GetProfessorIdFromJwt();
            var professor = _context.Professors.FirstOrDefault(p => p.Id == professorId.Id);
            var professorClass = _context.Classes.FirstOrDefault(c => c.ProfessorId == professorId.Id);

            if (professorClass is null)
            {
                Console.WriteLine("Professor is not assigned to any class.");
            }

            var testEntity = new TestClass 
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
                        TestId = questionDTO.TestId,
                        Answers = questionDTO.Answer
                            .Select(answerDTO => new Answer
                            {
                                AnswerName = answerDTO.AnswerName,
                                IsCorrect = answerDTO.IsCorrect,
                            }).ToList(),
                    }).ToList(),
            };

            _context.Tests.Add(testEntity);
            _context.SaveChanges();

            // Assuming you want to return a DTO of the created entity
            return new TestDTO
            {
                TestName = testEntity.TestName,
                Time = testEntity.Time,
                IsActive = testEntity.IsActive,
                ActiveDate = testEntity.ActiveDate,
                ClassId = testEntity.ClassId,
                Questions = testEntity.Questions
                    .Select(question => new QuestionDTO
                    {
                        QuestionName = question.QuestionName,
                        TestId = question.TestId,
                        Answer = question.Answers
                            .Select(answer => new AnswerDTO
                            {
                                AnswerName = answer.AnswerName,
                                IsCorrect = answer.IsCorrect,
                            }).ToList(),
                    }).ToList(),
            };
        }


        public List<TestDTO> GetTest(User user)
        {
            var testsWithProfessors = _context.Tests
                .Where(test =>
                    test.Class.ProfessorId == user.Id ||
                    test.Class.Students.Any(student => student.Id == user.Id)
                )
                .Include(test => test.Class.Professor)
                .Select(test => new TestDTO
                {
                    Id = test.Id,
                    TestName = test.TestName,
                    Time = test.Time,
                    IsActive = test.IsActive,
                    ActiveDate = test.ActiveDate,
                    ClassId = test.ClassId,
                    ProfessorFirstName = test.Class.Professor.FirstName,
                    ProfessorLastName = test.Class.Professor.LastName,
                    Questions = test.Questions
                        .Select(question => new QuestionDTO
                        {
                            QuestionName = question.QuestionName,
                            TestId = question.TestId,
                            Answer = question.Answers
                                .Select(answer => new AnswerDTO
                                {
                                    AnswerName = answer.AnswerName,
                                    IsCorrect = answer.IsCorrect
                                })
                                .ToList()
                        })
                        .ToList()
                })
                .ToList();

            return testsWithProfessors;
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
