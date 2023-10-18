using dotLearn.Domain.DTO;
using dotLearn.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Application.Common.Interfaces.Test
{
    public interface ITestRepository
    {
        TestDTO Create(CreateTestDTO testClass);
        List<TestDTO> GetTest(User studentId);
        Task OpenTestsOnActiveDateAsync();
        void AddGrade(int testId, double score, int studentId);
        Task<List<TestResultDTO>> GetTestResult();
        Task<List<TestListDTO>> GetNextTests();
    }
}
