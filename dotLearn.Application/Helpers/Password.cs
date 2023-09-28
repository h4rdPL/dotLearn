using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Application.Helpers
{
    public class PasswordHasher
    {
        public static string EncryptPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public static bool VerifyPassword(string password, string hash)
        {
            Console.WriteLine("hasełko");
            Console.WriteLine(hash); // hasło z bazy
            Console.WriteLine(EncryptPassword(password)); // hasło niehashowane
            var pass = BCrypt.Net.BCrypt.Verify(password, hash);
            Console.WriteLine(pass);
            return BCrypt.Net.BCrypt.Verify(password, hash);
        }
    }
}
