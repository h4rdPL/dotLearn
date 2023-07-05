using dotLearn.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Application.Services.Test
{
    public class TestService : ITestService
    {
        private static List<TestClass> _testClasses = new List<TestClass>();

        public TestClass Create(TestClass testClass)
        {
            TestClass newTestClass = new TestClass
            {
                Id = Guid.NewGuid(),
                TestName = "New Test",
                Question = new List<Question>(),
                IsActive = true,
                ActiveDate = DateTime.Now
            };
            _testClasses.Add(newTestClass);
            return newTestClass;
        }

    }
}
