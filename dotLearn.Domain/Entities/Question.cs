using System.Text.Json.Serialization;

namespace dotLearn.Domain.Entities
{
    public class Question
    {
        public int Id { get; set; }
        public string QuestionName { get; set; }
        public List<Answer> Answer { get; set; }
        public int CorrectAnswerIndex { get; set; }
        // 1:n
        [JsonIgnore]
        public TestClass Test { get; set; }

    }
}
