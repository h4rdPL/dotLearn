using Backend.Data.Enums;

namespace Backend.Models
{
    public class Role
    {
        public int Id { get; set; }
        public UserRoles UserRole { get; set; }
    }
}
