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

namespace dotLearn.Application.Services.Test
{
    public class TestService : ITestService
    {
        private static List<TestClass> _testClasses = new List<TestClass>();
        private readonly IUserRepository _userRepository;

        public TestService(IUserRepository userRepository)
        {
            _userRepository = userRepository;   
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="testClass"></param>
        /// <returns></returns>
        public TestClass Create(TestClass testClass)
        {
            var currentPrincipal = System.Security.Claims.ClaimsPrincipal.Current;
            var professorIdClaim = currentPrincipal?.FindFirst("sub");

            Professor loggedProfessor = null; // Declare the variable outside the if block

            if (professorIdClaim != null && Guid.TryParse(professorIdClaim.Value, out Guid professorId))
            {
                // Pobierz profesora z bazy danych na podstawie identyfikatora
                var professor = _userRepository.GetUserById(professorId) as Professor;

                if (professor != null)
                {
                    loggedProfessor = professor;
                    testClass.Professor = professor;
                }
            }
            TestClass newTestClass = new TestClass
            {
                Id = Guid.NewGuid(),
                TestName = "New Test",
                Question = new List<Question>(),
                IsActive = true,
                ActiveDate = DateTime.Now,
                Students = null,
                Professor = loggedProfessor
            };
            _testClasses.Add(newTestClass);
            return newTestClass;
        }

    }
}
