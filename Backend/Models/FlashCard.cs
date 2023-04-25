namespace Backend.Models
{
    public class FlashCard
    {
        public int Id { get; set; }
        public string Front { get; set; }
        public string Back { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; }

        // relations - user

        public virtual User user { get; set; }
    }
}
