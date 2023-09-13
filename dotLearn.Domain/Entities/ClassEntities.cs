using dotLearn.Domain.Data.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Domain.Entities
{
    public class ClassEntities
    {
        public int Id { get; set; }
        public string? TestName { get; set; }
        public List<Question>? Questions { get; set; }
        public List<Student>? Students { get; set; }
        public Professor Professor { get; set; }
        public int Time { get; set; }
        public bool IsActive { get; set; } = false;
        public DateTime ActiveDate { get; set; }
    }
}
