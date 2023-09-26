﻿using dotLearn.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Domain.Entities
{
    public class TestClass
    {
        public int Id { get; set; }
        public string TestName { get; set; }
        public int Time { get; set; }
        public bool IsActive { get; set; } = false;
        public DateTime ActiveDate { get; set; }
        public int ClassId { get; set; }
        public ClassEntities Class { get; set; }
        public List<Question> Questions { get; set; }
    }

}
