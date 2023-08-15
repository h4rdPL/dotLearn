using System.Text.Json.Serialization;

namespace dotLearn.Domain.Entities
{
    public class Answer
    {
        public int Id { get; set; }
        public string AnswerName { get; set; }
        public bool IsCorrect { get; set; } = false;
        [JsonIgnore]
        public Question? Question { get; set; }
    }
}
