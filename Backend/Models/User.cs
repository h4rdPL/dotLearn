using Backend.Data.Enums;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public bool isActive { get; set; }
        public virtual UserRoles Role { get; set; }

        // Property for getting/setting the subject based on role
        public Language? Language { get; set; }


        // Private field for storing the subject for Professor role
        //private Language? _language;

        // Relations
        public List<UserClass> UserClasses { get; set; }

    }
}
