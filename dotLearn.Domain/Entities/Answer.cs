using System.Text.Json.Serialization;

namespace dotLearn.Domain.Entities
{
    public class Answer
    {
        public int Id { get; set; }
        public string? CorrectAnswer { get; set; }
        [JsonIgnore]
        public Question? Question { get; set; }
    }
}
