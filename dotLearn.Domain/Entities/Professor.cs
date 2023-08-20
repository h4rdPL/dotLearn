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
        public int Id { get; set; }
        public Subject Subject { get; set; }
    }
}
