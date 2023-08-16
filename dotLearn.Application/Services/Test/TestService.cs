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
        /// Creates a new test class and associates it with the logged-in professor.
        /// </summary>
        /// <param name="testClass">The test class entity to be created.</param>
        /// <returns>Returns the newly created test class entity.</returns>
        public TestClass Create(TestClass testClass)
        {
            var currentPrincipal = System.Security.Claims.ClaimsPrincipal.Current;
            var professorIdClaim = currentPrincipal?.FindFirst("sub");

            Professor loggedProfessor = null; // Declare the variable outside the if block

            if (professorIdClaim != null && Guid.TryParse(professorIdClaim.Value, out Guid professorId))
            {
                // Retrieve the professor from the database based on the identifier
                var professor = _userRepository.GetUserById(professorId) as Professor;

                if (professor != null)
                {
                    loggedProfessor = professor;
                    testClass.Professor = professor;
                }
            }

            // Create a new test class with default values
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

            // Add the new test class to the list
            _testClasses.Add(newTestClass);

            // Return the newly created test class entity
            return newTestClass;
        }


    }
}
