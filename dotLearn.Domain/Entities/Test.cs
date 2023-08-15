using dotLearn.Domain.DTO;
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
        public string? TestName { get; set; }
        public List<Question>? Question { get; set; }
        public List<Student>? Students { get; set; }
        public Professor? Professor { get; set; }
        public ClassEntities ClassEntities { get; set; }
        public int Time { get; set; }
        public bool IsActive { get; set; } = false;
        public DateTime ActiveDate { get; set; }
    }
}
