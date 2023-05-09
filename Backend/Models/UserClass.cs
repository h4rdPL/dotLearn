namespace Backend.Models
{
    public class UserClass
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int ClassId { get; set; }
        public Class Class { get; set; }

    }
}
