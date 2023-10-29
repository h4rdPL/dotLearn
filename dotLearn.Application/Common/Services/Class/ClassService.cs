using dotLearn.Domain.Data.Enum;
using dotLearn.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System.Web.Http;
using dotLearn.Application.Common.Services.Class;
using dotLearn.Application.Common.Interfaces.ClassPersistence;
using dotLearn.Application.Common.Interfaces.Persisence;
using dotLearn.Application.Common.Interfaces.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using dotLearn.Domain.DTO;
using Microsoft.AspNetCore.Mvc;

namespace dotLearn.Application.Services.Class
{
    public partial class ClassService : IClassService
    {
        private readonly IClassRepository _classRepository;
        private readonly IUserRepository _userRepository;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;

        public ClassService(IClassRepository classRepository, IUserRepository userRepository, IJwtTokenGenerator jwtTokenGenerator)
        {
            _classRepository = classRepository;
            _userRepository = userRepository;
            _jwtTokenGenerator = jwtTokenGenerator;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="professorId"></param>
        /// <param name="formFile"></param>
        /// <returns></returns>
        public async Task<ClassPdfFile> AddPDFFile(int professorId, IFormFile formFile, int classId)
        {
            return await _classRepository.AddPDFFIle(professorId, formFile, classId);
        }


        /// <summary>
        /// Creates a new class.
        /// </summary>
        /// <param name="newClass">The class entity to be created.</param>
        /// <returns>Returns the newly created class entity.</returns>
        public async Task<ClassEntities> Create(ClassDTO newClass)
        {
            try
            {
                var professor = _jwtTokenGenerator.GetProfessorIdFromJwt();
                var guid = Guid.NewGuid();
                var shortGuid = BitConverter.ToString(guid.ToByteArray()).Replace("-", "").Substring(0, 8);
                var classEntities = new ClassEntities
                {
                    ClassName = newClass.ClassName,
                    ClassCode = shortGuid,
                    ProfessorId = professor.Id,
                    Students = new List<Student>(),
                };

                foreach (var studentCardId in newClass.CardId)
                {
                    var student = _userRepository.GetStudentByCardId(studentCardId);
                    if (student != null)
                    {
                        classEntities.Students.Add(student);
                        Console.WriteLine(student.CardId);
                    }
                    else
                    {
                        Console.WriteLine($"Student with CardId {studentCardId} not found.");
                    }
                }

                _classRepository.Create(classEntities);

                return classEntities;
            }
            catch (Exception ex)
            {
                // Tutaj możesz obsłużyć błąd, np. logując go
                Console.WriteLine($"Error during class creation: {ex.Message}");
                throw;
            }
        }

        /// <summary>
        /// Deletes a class.
        /// </summary>
        /// <param name="myClass">The class entity to be deleted.</param>
        public void Delete(ClassEntities myClass)
        {
            _classRepository.Remove(myClass);
        }

        public List<StudentAndProfessorClassesDTO> GetClass()
        {
            var user = _jwtTokenGenerator.GetProfessorIdFromJwt();
            var result = _classRepository.GetAll(user);

            return result;

        }

        public async Task<List<PdfFile>> GetClassPDFFiles(int userId)
        {
            return await _classRepository.GetClassPDFFiles(userId);
        }

        public async Task<int> GetNumberOfStudents(int classId)
        {

            return await _classRepository.GetNumberOfStudents(classId);
        }

        public PdfFile GetPdfFileContent(int userId, string fileName)
        {
            return _classRepository.GetPdfFileContent(userId, fileName);
        }

        public Task<ClassEntitiesStudent> JoinToClassByCode(int userId, string classCode)
        {
            return _classRepository.JoinToClassByCode(userId, classCode);
        }

        public Task<bool> RemoveStudentFromClass(int classId, Guid studentId)
        {
            throw new NotImplementedException();
        }

    }
}