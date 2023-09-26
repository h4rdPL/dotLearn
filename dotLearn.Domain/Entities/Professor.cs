using dotLearn.Domain.Data.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Domain.Entities
{
    public class Professor : User
    {
        public Subject Subject { get; set; }
        public ICollection<ClassEntities> Classes { get; set; }
    }
}
