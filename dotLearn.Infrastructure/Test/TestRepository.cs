using dotLearn.Application.Common.Interfaces.Authentication;
using dotLearn.Application.Common.Interfaces.ClassPersistence;
using dotLearn.Application.Common.Interfaces.Persisence;
using dotLearn.Application.Common.Interfaces.Test;
using dotLearn.Application.Helpers;
using dotLearn.Application.Services.Test;
using dotLearn.Domain.DTO;
using dotLearn.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        public TestRepository(DotLearnDbContext context, IJwtTokenGenerator jwtTokenGenerator)
        {
            _context = context;
            _jwtTokenGenerator = jwtTokenGenerator;
        }

        public void AddGrade(int testId, double score, int studentId)
        {
            int grade = CalculateGrade.GradeCalculator(score);
            int userId = _jwtTokenGenerator.GetProfessorIdFromJwt().Id;
            
            var userTest = _context.UserTests.FirstOrDefault(x => x.TestId == testId && x.Student.Id == userId);
            if (userTest != null)
            {
                userTest.IsFinished = true;
            }

            var studentScore = new StudentScore
            {
                StudentId = studentId,
                TestId = testId,
                Grade = grade,
            };

            _context.StudentScores.Add(studentScore);
            _context.SaveChanges();
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

            var currentDateTime = DateTime.Now;

            var studentsInClass = _context.Students
                .Where(s => s.ClassEntitiesStudents.Any(ce => ce.ClassEntitiesId == professorClass.Id))
                .ToList();

            foreach (var student in studentsInClass)
            {
                var isActive = false;

                var userTestEntity = new UserTest
                {
                    IsFinished = false,
                    Student = student,
                    Test = testEntity,
                    IsActive = isActive,
                };

                _context.UserTests.Add(userTestEntity);
            }

            _context.SaveChanges();

            return new TestDTO
            {
                TestName = testEntity.TestName,
                Time = testEntity.Time,
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



        public async Task<List<TestListDTO>> GetNextTests()
        {
            var userId = _jwtTokenGenerator.GetProfessorIdFromJwt().Id;

            var currentDateTime = DateTime.Now;

            var nextTests = await _context.Tests
                .Where(test => test.ActiveDate > currentDateTime) 
                .OrderBy(test => test.ActiveDate) 
                .Take(3) 
                .Select(test => new TestListDTO
                {
                    ClassName = test.Class.ClassName,
                    TestName = test.TestName,
                    ActiveDate = test.ActiveDate,
                    Time = test.Time
                })
                .ToListAsync();

            return nextTests;
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
                        .ToList(),
                    UserTestData = _context.UserTests
                        .Where(ut => ut.TestId == test.Id && ut.Student.Id == user.Id)
                        .Select(ut => new UserTestDTO
                        {
                            IsActive = ut.IsActive,
                            IsFinished = ut.IsFinished
                        })
                        .FirstOrDefault()
                })
                .ToList();


            return testsWithProfessors;
        }

        public async Task<List<TestResultDTO>> GetTestResult()
        {
            var userId = _jwtTokenGenerator.GetProfessorIdFromJwt().Id;

            try
            {
                var testResults = await _context.StudentScores
                    .Include(score => score.Test)
                    .Include(score => score.Student)
                    .Where(score => score.StudentId == userId)
                    .OrderByDescending(score => score.Id)
                    .Take(3)
                    .Select(score => new TestResultDTO
                    {
                        TestName = score.Test.TestName,
                        ClassName = score.Test.Class.ClassName,
                        Grade = score.Grade
                    })
                    .ToListAsync();

                return testResults;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }
        public async Task OpenTestsOnActiveDateAsync()
        {
                var currentDate = DateTime.UtcNow;
                await _context.SaveChangesAsync();
        }
    }
}
