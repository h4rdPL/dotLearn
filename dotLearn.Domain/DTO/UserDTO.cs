using dotLearn.Domain.Data.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Domain.DTO
{
    public record struct UserDTO(
        int Id,
        string FirstName, 
        string LastName, 
        string Email,
        string Password,
        Role Role
        );
}
