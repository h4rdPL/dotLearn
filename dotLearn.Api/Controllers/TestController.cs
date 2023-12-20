using dotLearn.Application.Common.Interfaces.Authentication;
using dotLearn.Application.Services.Test;
using dotLearn.Domain.DTO;
using dotLearn.Domain.Entities;
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

        /// <summary>
        /// Retrieves the tests available for a student.
        /// </summary>
        /// <returns>An asynchronous task that represents the HTTP response containing the list of tests for the student.</returns>
        [HttpGet("getTest")]
        public async Task<ActionResult<TestDTO>> GetTestsForStudent()
        {
            var result = _testService.GetTest();
            return await Task.FromResult(Ok(result));
        }

        /// <summary>
        /// Submits test results for a student.
        /// </summary>
        /// <param name="testId">The unique identifier of the test.</param>
        /// <param name="score">The score achieved by the student in the test.</param>
        [HttpPost("SubmitTestResults/{testId}")]
        public void SubmitTestResults(int testId, double score)
        {
            var studentId = _jwtTokenGenerator.GetProfessorIdFromJwt().Id;
            _testService.AssignScoreToStudent(testId, score, studentId);
        }

        /// <summary>
        /// Retrieves the test results.
        /// </summary>
        /// <returns>An asynchronous task that represents the HTTP response containing the list of test results.</returns>
        [HttpGet("GetTestResult")]
        public async Task<List<TestResultDTO>> GetTestResult()
        {
            var result = await _testService.GetTestResult();
            return result;
        }

        /// <summary>
        /// Retrieves the next set of tests.
        /// </summary>
        /// <returns>An asynchronous task that represents the HTTP response containing the list of upcoming tests.</returns>
        [HttpGet("GetNextTest")]
        public async Task<List<TestListDTO>> GetNextTests()
        {
            var result = await _testService.GetNextTests();
            return result;
        }

        /// <summary>
        /// Retrieves the grades from students.
        /// </summary>
        /// <returns>An asynchronous task that represents the HTTP response containing the list of student grades.</returns>
        [HttpGet("GetStudentGrades")]
        public async Task<List<GradeSummaryDTO>> GetGradesFromStudents()
        {
            var result = await _testService.GetGradesFromStudent();
            return result;
        }


    }


}
