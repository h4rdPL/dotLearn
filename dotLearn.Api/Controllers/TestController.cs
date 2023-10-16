using dotLearn.Application.Services.Test;
using dotLearn.Domain.DTO;
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
        public async Task<ActionResult<TestClass>> CreateTest(TestDTO testClass)
        {
            _testService.Create(testClass);
            return await Task.FromResult(Ok(testClass));
        }

        [HttpGet("getTest")]
        public async Task<ActionResult<TestDTO>> GetTestsForStudent()
        {
            var result = _testService.GetTest();
            return await Task.FromResult(Ok(result));
        }

        [HttpPost("SubmitTestResults/{testId}")]
        public void SubmitTestResults(int testId, double score)
        {
                _testService.AssignScoreToStudent(testId, score);
        }
        [HttpGet("GetTestResult")]
        public async Task<List<TestResultDTO>> GetTestResult()
        {
            var result = await _testService.GetTestResult();
            return result;
        }

        [HttpGet("GetNextTest")]
        public async Task<List<TestListDTO>> GetNextTests()
        {
            var result = await _testService.GetNextTests();
            return result;
        }


    }
}
