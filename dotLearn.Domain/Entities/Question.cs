using dotLearn.Domain.DTO;
using System.Text.Json.Serialization;

namespace dotLearn.Domain.Entities
{
    public class Question
    {
        public int Id { get; set; }
        public string? QuestionName { get; set; }
        public int TestId { get; set; }
        public TestClass Test { get; set; }
        public List<Answer> Answers { get; set; }

    }
}
