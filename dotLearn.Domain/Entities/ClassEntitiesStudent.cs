using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Domain.Entities
{
    public class ClassEntitiesStudent
    {
        public int StudentId { get; set; }
        public Student Student { get; set; }
        public int ClassEntitiesId { get; set; }
        public ClassEntities ClassEntities { get; set; }
    }

}
