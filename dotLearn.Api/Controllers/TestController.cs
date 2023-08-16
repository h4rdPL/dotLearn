using dotLearn.Application.Services.Test;
using dotLearn.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace dotLearn.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly ITestService _testService;
        public TestController(ITestService testService)
        {
            _testService = testService;
        }
        /// <summary>
        /// Creates a new test.
        /// </summary>
        /// <param name="testClass">The test instance to be created.</param>
        /// <returns>Returns the newly created test instance.</returns>
        [HttpPost("create")]
        public async Task<ActionResult<TestClass>> CreateTest(TestClass testClass)
        {
            _testService.Create(testClass);
            return await Task.FromResult(Ok(testClass));
        }

    }
}
