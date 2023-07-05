namespace Backend.Models
{
    public class Test
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public int Time { get; set; }
        public int Score { get; set; }
        public bool IsActive { get; set; }
        public DateTime ActivationDate { get; set; }

        // Relations -> question, user, class

        //public List<Question> MyProperty { get; set; }

    }
}
