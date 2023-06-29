using dotLearn.Domain.Data.Enum;
using dotLearn.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Domain.Entities
{
    public class Job
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public int Salary { get; set; }
        public Money Currency { get; set; }
        public string? description { get; set; }
        public string? Email { get; set; }
        public List<ExpectationsCreateDTO>? Expectations { get; set; }
        public List<OfferCreateDTO>? Offer { get; set; }
        public List<BenefitsCreateDTO>? Benefits { get; set; }
        //public byte[]? CV { get; set; }
    }
}
