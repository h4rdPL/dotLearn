using dotLearn.Domain.DTO;
using dotLearn.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Application.Services.Test
{
    public interface ITestService
    {
        void Create(TestDTO testClass);
        List<TestDTO> GetTest();
        void OpenTest();

    }
}
