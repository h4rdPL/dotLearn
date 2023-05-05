using Backend.Models;
using Backend.Models.Dto;

namespace Backend.Services.ClassService
{
    public interface IClassService
    {
        public bool CreateClass(ClassDTO classDTO);

        public void DeleteClass();
        public bool ClassEnrollment(UserIdDTO userIdDTO, string uniqueClassCode);
        public void ExitClass();
        public Task<int> GetMemberNumbers();
        public Task<string> GetProffesorName();
        public IEnumerable<string> GetAllClasses();    
    }
}
