namespace dotLearn.Application.Helpers
{
    public class PasswordHasher
    {
        /// <summary>
        /// Encrypts a plain-text password using the BCrypt hashing algorithm.
        /// </summary>
        /// <param name="password">The plain-text password to be encrypted.</param>
        /// <returns>A hashed representation of the provided password.</returns>

        public static string EncryptPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }


        /// <summary>
        /// Verifies a plain-text password against a hashed password.
        /// </summary>
        /// <param name="password">The plain-text password to be verified.</param>
        /// <param name="hash">The hashed password to compare against.</param>
        /// <returns>
        /// True if the provided plain-text password matches the hashed password; otherwise, false.
        /// </returns>
        public static bool VerifyPassword(string password, string hash)
        {
            Console.WriteLine("hasło");
            Console.WriteLine(hash); 
            Console.WriteLine(EncryptPassword(password));
            var pass = BCrypt.Net.BCrypt.Verify(password, hash);
            Console.WriteLine(pass);
            return BCrypt.Net.BCrypt.Verify(password, hash);
        }
    }
}
