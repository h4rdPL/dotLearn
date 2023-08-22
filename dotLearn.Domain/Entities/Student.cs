using dotLearn.Domain.Entities; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace dotLearn.Domain.Entities
{
    public class Student : User
    {
        public int Id { get; set; }
        public int CardId { get; set; }
    }
}
