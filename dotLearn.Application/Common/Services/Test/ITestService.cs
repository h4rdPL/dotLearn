
using dotLearn.Domain.DTO;

namespace dotLearn.Application.Services.Test
{
    public interface ITestService
    {
        void Create(CreateTestDTO testClass);
        List<TestDTO> GetTest();
        void OpenTest();
        void AssignScoreToStudent(int testId, double score, int studentId);
        Task<List<TestResultDTO>> GetTestResult();
        Task<List<TestListDTO>> GetNextTests();
        Task<List<GradeSummaryDTO>> GetGradesFromStudent();
    }
}
