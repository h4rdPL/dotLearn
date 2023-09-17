using dotLearn.Domain.Entities;
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
        public string? ClassName { get; set; }
        public Guid ClassCode { get; set; }
        public int ProfessorId { get; set; }
        public virtual List<Student> Students { get; set; }
    }
}
