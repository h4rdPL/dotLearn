using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Domain.Entities
{
    public class UserTest
    {
        public int Id { get; set; }
        public int TestId { get; set; }
        public bool IsActive { get; set; }
        public bool IsFinished { get; set; }
        public TestClass Test { get; set; }
        public Student Student { get; set; }
    }
}
