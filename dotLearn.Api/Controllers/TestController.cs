using dotLearn.Application.Common.Interfaces.Authentication;
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
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        public TestController(ITestService testService, IJwtTokenGenerator jwtTokenGenerator)
        {
            _testService = testService;
            _jwtTokenGenerator = jwtTokenGenerator;
        }
        /// <summary>
        /// Creates a new test.
        /// </summary>
        /// <param name="testClass">The test instance to be created.</param>
        /// <returns>Returns the newly created test instance.</returns>
        [HttpPost("create")]
        public async Task<ActionResult<TestClass>> CreateTest(CreateTestDTO testClass)
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
            var studentId = _jwtTokenGenerator.GetProfessorIdFromJwt().Id;
            _testService.AssignScoreToStudent(testId, score, studentId);
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
        [HttpGet("GetStudentGrades")]
        public async Task<List<GradeSummaryDTO>> GetGradesFromStudents()
        {
            var result = await _testService.GetGradesFromStudent();
            return result;
        }


    }


}
