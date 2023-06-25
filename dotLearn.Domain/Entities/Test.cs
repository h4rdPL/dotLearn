using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Domain.Entities
{
    public class TestClass
    {
        public Guid Id { get; set; }
        public string TestName { get; set; }
        public List<Question> Questions { get; set; }
        public bool isActive { get; set; }
        public DateTime ActiveDate { get; set; }
    }
}
