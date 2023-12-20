using dotLearn.Application.Common.Interfaces.Authentication;
using dotLearn.Application.Common.Interfaces.Test;
using dotLearn.Domain.DTO;

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

        public void AssignScoreToStudent(int testId, double score, int studentId)
        {
            _testRepository.AddGrade(testId, score, studentId);
        }

        /// <summary>
        /// Creates a new test class and associates it with the logged-in professor.
        /// </summary>
        /// <param name="testClass">The test class entity to be created.</param>
        /// <returns>Returns the newly created test class entity.</returns>
        public void Create(CreateTestDTO testClass)
        {
            _testRepository.Create(testClass);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public async Task<List<GradeSummaryDTO>> GetGradesFromStudent()
        {
            return await _testRepository.GetGradesFromStudent();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public async Task<List<TestListDTO>> GetNextTests()
        {
            return await _testRepository.GetNextTests(); 
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<TestDTO> GetTest()
        {
            var user = _jwtTokenGenerator.GetProfessorIdFromJwt();
            var result = _testRepository.GetTest(user);
            return result;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public async Task<List<TestResultDTO>> GetTestResult()
        {
            var result = await _testRepository.GetTestResult();
            return result;
        }

        /// <summary>
        /// 
        /// </summary>
        public void OpenTest()
        {
            _testRepository.OpenTestsOnActiveDateAsync();
        }
    }
}
