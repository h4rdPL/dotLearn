using System.Text.Json.Serialization;

namespace dotLearn.Domain.Entities
{
    public class Question
    {
        public int Id { get; set; }
        public string? QuestionName { get; set; }
        public List<Answer> Answers { get; set; }
    }
}
