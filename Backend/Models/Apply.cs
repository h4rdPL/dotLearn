using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata;

namespace Backend.Models
{
    public class Apply
    {
        public int Id { get; set; }
        public Blob Cv { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
