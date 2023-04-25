using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public bool isActive { get; set; }
        public virtual Role Role { get; set; }

        // Relations
        public ICollection<ClassUser> ClassUsers { get; set; }

    }
}
