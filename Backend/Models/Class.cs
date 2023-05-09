using Backend.Data.Enums;

namespace Backend.Models
{
    public class Class
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Subname { get; set; }
        public virtual Language language { get; set; }
        public string ClassCode { get; set; }

        // Relations - n:n -> users & class
        //public ICollection<ClassUser> ClassUsers { get; set; }
        public List<UserClass> UserClasses { get; set; }


    }
}
