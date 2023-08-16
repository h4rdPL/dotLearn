using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Domain.Entities
{
    public class FlashCard
    {
        public int Id { get; set; }
        public string Definition { get; set; }
        public string Meaning { get; set; }
        public string Category { get; set; }
        public List<Student> Students { get; set; }
    }
}
