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
        public string TestName { get; set; }
        public int ProfessorId { get; set; }
        public Professor Professor { get; set; }
        public List<ClassEntitiesStudent> ClassEntitiesStudents { get; set; } // Relacja wiele-do-wielu z ClassEntitiesStudent
        public int Time { get; set; }
        public bool IsActive { get; set; } = false;
        public DateTime ActiveDate { get; set; }
    }

}
