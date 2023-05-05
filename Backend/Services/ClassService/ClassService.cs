using Backend.Data;
using Backend.Models;
using Backend.Models.Dto;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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

        public bool ClassEnrollment(UserIdDTO userIdDTO, string uniqueClassCode)
        {

            var currentClass = _context.Class.FirstOrDefault(c => c.ClassCode == uniqueClassCode);
            if (currentClass == null)
            {
                return false;
            }

            var loggedUser = _httpContextAccessor.HttpContext.User;
            var userEmail = loggedUser.FindFirstValue(ClaimTypes.Name);

            var getUser = _context.Users.Include(u => u.ClassUsers).SingleOrDefault(cu => cu.Email == userEmail);



            var newClassUser = new ClassUser
            {
                UserId = userIdDTO.Id,
                ClassId = currentClass.Id
            };

            currentClass.ClassUsers.Add(newClassUser);
            _context.SaveChanges();
            return true;
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
    }
}
