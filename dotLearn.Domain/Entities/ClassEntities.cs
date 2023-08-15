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
        public Guid ClassCode { get; set; }
        public Subject Subject { get; set; }
        public Professor Professor { get; set; }
        public List<Student>? Student { get; set; }

    }
}
