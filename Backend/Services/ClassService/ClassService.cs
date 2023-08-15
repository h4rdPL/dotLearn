using Azure.Core;
using Backend.Data;
using Backend.Models;
using Backend.Models.Dto;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Backend.Services.ClassService
{
    public class ClassService : IClassService
    {
        public static Class classModel = new Class();


        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ClassService(IConfiguration configuration, ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _configuration = configuration;
            _context = context;
        }

        public static string GenerateClassCode()
        {
            char[] allowedClassChars = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'M', 'N', 'P', 'Q', 'R', 'T', 'V', 'W', 'X', 'Y', '2', '3', '4', '6', '7', '8', '9' };
            Guid guid = Guid.NewGuid();
            string classCode = Convert.ToBase64String(guid.ToByteArray());
            classCode = new string(classCode.Where(c => allowedClassChars.Contains(c)).ToArray());
            return classCode.Substring(0, 7).ToLower(); // take the first 7 characters
        }



        public bool CreateClass(ClassDTO classDTO)
        {


            if (classDTO == null)
            {
                return false;
            }
            string generatedCode = GenerateClassCode();
            var createClass = new Class()
            {
                Name = classDTO.Name,
                Subname = classDTO.Subname,
                language = classDTO.language,
                ClassCode = generatedCode,
            };

            _context.Add(createClass);
            _context.SaveChanges();

            return true;
        }


        public void DeleteClass()
        {
            throw new NotImplementedException();
        }

        public void ExitClass()
        {
            throw new NotImplementedException();
        }



        
    public IEnumerable<string> GetAllClasses()
        {
            throw new NotImplementedException();
        }

        public Task<int> GetMemberNumbers()
        {
            throw new NotImplementedException();
        }

        public Task<string> GetProffesorName()
        {
            throw new NotImplementedException();
        }


        [HttpPost]
        public bool ClassEnrollment(Guid classCode)
        {

            var jwt = _httpContextAccessor.HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            // Get the user's email from the JWT
            // 1. Pobranie adresu email użytkownika z tokenu
            var userEmail = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Email)?.Value;
            System.Diagnostics.Debug.WriteLine("This will be displayed in output window");

            if (userEmail == null)
            {
                return false;
            }
            // 2. Wyszukanie klasy w bazie danych na podstawie kodu klasy
            var classes = _context.Class.Where(c => c.ClassCode == classCode.ToString()).FirstOrDefault();

            // 3. Sprawdzenie czy klasa o podanym kodzie istnieje
            if (classes == null)
            {
                return false;
            }
            Console.WriteLine($"classUser added: {classes} {userEmail}");

            // 4. Dodanie użytkownika do klasy
            var user = _context.Users.Single(u => u.Email == userEmail);
                var classUser = new UserClass { UserId = user.Id, ClassId = classes.Id };
            _context.ClassUsers.Add(classUser);

            _context.SaveChanges();

            return true;
        }



    }
}
