namespace dotLearn.Domain.Entities
{
    public class Question
    {
        public int MyProperty { get; set; }
        public string QuestionName { get; set; }
        public List<string> Answer { get; set; }
        public int CorrectAnswerIndex { get; set; }

    }
}
