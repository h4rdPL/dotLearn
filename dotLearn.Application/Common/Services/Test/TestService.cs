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

namespace dotLearn.Application.Services.Test
{
    public class TestService : ITestService
    {
        private static List<TestClass> _testClasses = new List<TestClass>();
        private readonly IUserRepository _userRepository;
        private readonly ITestRepository _testRepository;
        public TestService(IUserRepository userRepository, ITestRepository testRepository)
        {
            _userRepository = userRepository;   
            _testRepository = testRepository;
        }
        /// <summary>
        /// Creates a new test class and associates it with the logged-in professor.
        /// </summary>
        /// <param name="testClass">The test class entity to be created.</param>
        /// <returns>Returns the newly created test class entity.</returns>
        public TestClass Create(TestClass testClass)
        {
            _testRepository.Create(testClass);
            return testClass;
        }




    }
}
