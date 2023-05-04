namespace Backend.Services.ClassService
{
    public interface IClassService
    {
        public bool CreateClass();
        public void DeleteClass();
        public void JoinToClass();
        public void ExitClass();
        public Task<int> GetMemberNumbers();
        public Task<string> GetProffesorName();
        public IEnumerable<string> GetAllClasses();    
    }
}
