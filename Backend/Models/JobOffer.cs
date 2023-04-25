namespace Backend.Models
{
    public class JobOffer
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Salary { get; set; }
        public string Type { get; set; }
        public string Level { get; set; }
        public string Description { get; set; }
        public string Exceptation { get; set; }
        public string Benefit { get; set; }

        // relations -> 1:1

        public virtual Apply Apply { get; set; }

    }
}
