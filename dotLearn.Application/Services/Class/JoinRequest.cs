using dotLearn.Domain.Entities;

namespace dotLearn.Application.Services.Class
{
    public partial class ClassService
    {
        public class JoinRequest
        {
            public Guid ClassId { get; set; }
            public Student Student { get; set; }
        }
    }
}