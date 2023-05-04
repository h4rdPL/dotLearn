using Backend.Data;
using Backend.Models;

namespace Backend.Services.ClassService
{
    public class ClassService : IClassService
    {
        public static Class myClass = new Class();


        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;
        public ClassService(IConfiguration configuration, ApplicationDbContext context)
        {
            _configuration = configuration;
            _context = context;
        }
        public bool CreateClass()
        {
            throw new NotImplementedException();
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

        public void JoinToClass()
        {
            throw new NotImplementedException();
        }
    }
}
