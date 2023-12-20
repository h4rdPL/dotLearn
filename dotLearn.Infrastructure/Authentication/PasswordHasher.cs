using dotLearn.Application.Common.Interfaces.Authentication;
using System.Security.Cryptography;

namespace dotLearn.Infrastructure.Authentication
{
    public class PasswordHasher : IPasswordHasher
    {
        private const int SaltSize = 128 / 8; // 16 bytes
        private const int KeySize = 256 / 8;   // 32  hash for spec. length - same as has alg.
        private const int Iteration = 10000;
        private static readonly HashAlgorithmName _hashAlgorithmName = HashAlgorithmName.SHA256;
        private const char Delimiter = ';';

        /// <summary>
        /// Hashes a password using a secure key derivation function (PBKDF2) with a random salt.
        /// </summary>
        /// <param name="password">The password to be hashed.</param>
        /// <returns>A string representing the hashed password and the salt, separated by a delimiter.</returns>
        public string Hash(string password)
        {
            var salt = RandomNumberGenerator.GetBytes(SaltSize);
            var hash = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iteration, _hashAlgorithmName, KeySize);

            return string.Join(Delimiter, Convert.ToBase64String(salt), Convert.ToBase64String(hash));
        }

        /// <summary>
        /// Verifies a user's password against a stored password hash.
        /// </summary>
        /// <param name="passwordHash">The stored password hash, including the salt.</param>
        /// <param name="userPassword">The user's password to be verified.</param>
        /// <returns>True if the user's password matches the stored password hash; otherwise, false.</returns>
        public bool VerifyPassword(string passwordHash, string userPassword)
        {
            var element = passwordHash.Split(Delimiter);
            var salt = Convert.FromBase64String(element[0]);
            var hash = Convert.FromBase64String(element[1]);

            Console.WriteLine(salt + " " + hash);
            var hashInput = Rfc2898DeriveBytes.Pbkdf2(userPassword, salt, Iteration, _hashAlgorithmName, KeySize);

            return CryptographicOperations.FixedTimeEquals(hash, hashInput);    
        }
    }
}
