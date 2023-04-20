using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Dto
{
    public class UserDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }
        public virtual Role Role { get; set; }
    }
}
