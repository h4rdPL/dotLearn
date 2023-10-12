using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Domain.Entities
{
    public class StudentResult
    {
        public int StudentResultId { get; set; }
        public int TestId { get; set; }
        public int StudentId { get; set; }
        public int Score { get; set; }
        public int GradeId { get; set; }
        public TestClass Test { get; set; }
        public Grade Grade { get; set; }
    }
}
