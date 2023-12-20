using dotLearn.Domain.DTO;
using dotLearn.Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace dotLearn.Application.Common.Interfaces.ClassPersistence
{
    public interface IClassRepository
    {
        Task<ClassEntities> Create(ClassEntities classEntity);
        Task<ClassPdfFile> AddPDFFIle(int professorId, IFormFile fileUploadDTO, int classId);
        List<StudentAndProfessorClassesDTO> GetAll(User user);
        void Remove(ClassEntities classEntity);
        Task<List<PdfFile>> GetClassPDFFiles(int userId);
        PdfFile GetPdfFileContent(int classId, string fileName);
        Task<ClassEntitiesStudent> JoinToClassByCode(int userId, string classCode);
        Task<int> GetNumberOfStudents(int classId);
    }
}
