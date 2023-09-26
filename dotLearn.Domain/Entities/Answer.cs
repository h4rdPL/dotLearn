using System.Text.Json.Serialization;

namespace dotLearn.Domain.Entities
{
    public class Answer
    {
        public int Id { get; set; }
        public string AnswerName { get; set; }
        public bool IsCorrect { get; set; } = false;
        public int QuestionId { get; set; }
        public Question Question { get; set; }
    }
}
