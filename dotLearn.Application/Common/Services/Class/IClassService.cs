using dotLearn.Domain.DTO;
using dotLearn.Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace dotLearn.Application.Common.Services.Class
{
    public interface IClassService
    {
        Task<ClassEntities> Create(ClassDTO newClass);
        public void Delete(ClassEntities myClass);
        List<StudentAndProfessorClassesDTO> GetClass();
        Task<ClassPdfFile> AddPDFFile(int professorId, IFormFile formFile, int ClassId);
        Task<List<PdfFile>> GetClassPDFFiles(int uesrId);
        PdfFile GetPdfFileContent(int userId,string fileName);
        Task<ClassEntitiesStudent> JoinToClassByCode(int userId, string classCode);
        Task<int> GetNumberOfStudents(int classId);
    }
}
