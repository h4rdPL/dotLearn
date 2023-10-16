using dotLearn.Application.Common.Interfaces.Authentication;
using dotLearn.Application.Common.Interfaces.Persisence;
using dotLearn.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.EntityFrameworkCore;
using dotLearn.Application.Common.Interfaces.Test;
using dotLearn.Domain.DTO;
using System.Web.Http;

namespace dotLearn.Application.Services.Test
{
    public class TestService : ITestService
    {
        private readonly ITestRepository _testRepository;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        public TestService(ITestRepository testRepository, IJwtTokenGenerator jwtTokenGenerator)
        {
            _testRepository = testRepository;
            _jwtTokenGenerator = jwtTokenGenerator;
        }

        public void AssignScoreToStudent(int testId, double score)
        {
            var studentId = _jwtTokenGenerator.GetProfessorIdFromJwt().Id;

            _testRepository.AddGrade(testId, score, studentId);
        }

        /// <summary>
        /// Creates a new test class and associates it with the logged-in professor.
        /// </summary>
        /// <param name="testClass">The test class entity to be created.</param>
        /// <returns>Returns the newly created test class entity.</returns>
        public void Create(TestDTO testClass)
        {
            _testRepository.Create(testClass);
        }

        public async Task<List<TestListDTO>> GetNextTests()
        {
            return await _testRepository.GetNextTests(); 
        }

        public List<TestDTO> GetTest()
        {
            var user = _jwtTokenGenerator.GetProfessorIdFromJwt();
            var result = _testRepository.GetTest(user);
            return result;
        }

        public async Task<List<TestResultDTO>> GetTestResult()
        {
            var result = await _testRepository.GetTestResult();
            return result;
        }


        public void OpenTest()
        {
            _testRepository.OpenTestsOnActiveDateAsync();
        }
    }
}
