using dotLearn.Application.Common.Interfaces.ClassPersistence;
using dotLearn.Domain.DTO;
using dotLearn.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace dotLearn.Infrastructure.ClassEntitities
{
    public class ClassRepository : IClassRepository
    {

        private readonly DotLearnDbContext _context;
        public ClassRepository(DotLearnDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Adds a PDF file to a class for a professor.
        /// </summary>
        /// <param name="professorId">The ID of the professor.</param>
        /// <param name="fileUploadDTO">The PDF file to be added.</param>
        /// <param name="classId">The ID of the class.</param>
        /// <returns>An asynchronous task representing the added ClassPdfFile.</returns>
        public async Task<ClassPdfFile> AddPDFFIle(int professorId, IFormFile fileUploadDTO, int ClassId)
        {
            try
            {
                var classId = await _context.Classes
                    .Where(c => c.ProfessorId == professorId && c.Id == ClassId)
                    .Select(c => c.Id)
                    .FirstOrDefaultAsync();

                if (classId == 0)
                {
                    throw new Exception("Error while returning class");
                }

                byte[] fileBytes;
                using (var stream = new MemoryStream())
                {
                    await fileUploadDTO.CopyToAsync(stream);
                    fileBytes = stream.ToArray();
                }
                var classPdfFile = new ClassPdfFile
                {
                    ClassId = classId,
                    PdfFile = new PdfFile
                    {
                        Name = fileUploadDTO.FileName,
                        FileContent = fileBytes
                    }
                };

                _context.ClassPdfFiles.Add(classPdfFile);

                await _context.SaveChangesAsync();

                return classPdfFile;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Creates a new class entity.
        /// </summary>
        /// <param name="classEntity">The class entity to be created.</param>
        /// <returns>An asynchronous task representing the created ClassEntities.</returns>
        /// <exception cref="Exception">Thrown if class creation fails.</exception>
        public async Task<ClassEntities> Create(ClassEntities classEntity)
        {
            try
            {
                _context.Classes.Add(classEntity);
                await _context.SaveChangesAsync();
                return classEntity;
            }
            catch (Exception ex)
            {
                throw new Exception("Class creation failed.", ex);
            }
        }

        /// <summary>
        /// Retrieves a list of classes for a user (student or professor) along with related information.
        /// </summary>
        /// <param name="user">The user for whom classes are retrieved.</param>
        /// <returns>A list of StudentAndProfessorClassesDTO representing the classes with professors and PDFs.</returns>
        public List<StudentAndProfessorClassesDTO> GetAll(User user)
        {
            var classesWithProfessorsAndPDFs = _context.Classes
                .Where(ce => _context.ClassEntitiesStudents
                    .Any(ces => ces.ClassEntitiesId == ce.Id && ces.StudentId == user.Id) || ce.ProfessorId == user.Id)
                .Select(ce => new StudentAndProfessorClassesDTO
                {
                    Id = ce.Id,
                    ClassName = ce.ClassName,
                    ClassCode = ce.ClassCode,
                    FirstName = ce.Professor.FirstName,
                    LastName = ce.Professor.LastName,
                    PdfFiles = _context.ClassPdfFiles
                        .Where(cp => cp.ClassId == ce.Id)
                        .Select(cp => cp.PdfFile)
                        .ToList(),
                    StudentNumbers = _context.ClassEntitiesStudents
                        .Where(ces => ces.ClassEntitiesId == ce.Id)
                        .Select(ces => ces.StudentId)
                        .Distinct()
                        .Count()
                })
                .ToList();

            return classesWithProfessorsAndPDFs;
        }


        /// <summary>
        /// Retrieves a list of PDF files associated with classes taught by a professor.
        /// </summary>
        /// <param name="userId">The ID of the professor.</param>
        /// <returns>An asynchronous task representing the list of PdfFile entities.</returns>
        /// <exception cref="Exception">Thrown if an error occurs during retrieval.</exception>
        public async Task<List<PdfFile>> GetClassPDFFiles(int userId)
        {
            try
            {
                var pdfFiles = await _context.ClassPdfFiles
                    .Where(cp => cp.Class.ProfessorId == userId)
                    .Select(cp => cp.PdfFile)
                    .ToListAsync();

                return pdfFiles;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Retrieves the number of students enrolled in a class.
        /// </summary>
        /// <param name="classId">The ID of the class.</param>
        /// <returns>An asynchronous task representing the number of students in the class.</returns>
        /// <exception cref="Exception">Thrown if an error occurs during retrieval.</exception>
        public async Task<int> GetNumberOfStudents(int classId)
        {
            try
            {
                var numberOfStudents = await _context.ClassEntitiesStudents
                    .Where(s => s.ClassEntitiesId == classId)
                    .Select(s => s.StudentId)
                    .Distinct()
                    .CountAsync();
                return numberOfStudents;
            }
            catch (Exception err)
            {
                throw new Exception(err.Message);
            }
        }


        /// <summary>
        /// Retrieves the content of a PDF file associated with a user (student) and a specified filename.
        /// </summary>
        /// <param name="userId">The ID of the user (student).</param>
        /// <param name="fileName">The name of the PDF file to retrieve.</param>
        /// <returns>The retrieved PdfFile entity.</returns>
        /// <exception cref="FileNotFoundException">Thrown if the PDF file is not found.</exception>
        public PdfFile GetPdfFileContent(int userId, string fileName)
        {
            var userClass = _context.ClassEntitiesStudents
                .Include(ce => ce.Student)
                .SingleOrDefault(ce => ce.Student.Id == userId);


            var pdfFile = _context.ClassPdfFiles
                .Include(cp => cp.PdfFile) 
                .FirstOrDefault(cp => cp.ClassId == userClass.ClassEntitiesId && cp.PdfFile.Name == fileName);

            if (pdfFile == null)
            {
                throw new FileNotFoundException("PDF file not found.");
            }

            var pdfFileResponse = new PdfFile
            {
                Name = pdfFile.PdfFile.Name,
                FileContent = pdfFile.PdfFile.FileContent
            };

            return pdfFileResponse;
        }

        /// <summary>
        /// Joins a student to a class using a class code.
        /// </summary>
        /// <param name="userId">The ID of the student.</param>
        /// <param name="classCode">The class code to join.</param>
        /// <returns>An asynchronous task representing the created ClassEntitiesStudent.</returns>
        /// <exception cref="Exception">Thrown if an error occurs during joining.</exception>
        public async Task<ClassEntitiesStudent> JoinToClassByCode(int userId, string classCode)
        {
            try
            {
                var classId = _context.Classes.FirstOrDefault(x => x.ClassCode == classCode);

                var existingRelation = _context.ClassEntitiesStudents
                .FirstOrDefault(r => r.StudentId == userId && r.ClassEntitiesId == classId.Id);
                if(existingRelation is not null)
                {
                    throw new Exception("Student już należy do danej klasy");
                }
                var classStudent = new ClassEntitiesStudent
                {
                    StudentId = userId,
                    ClassEntitiesId = classId.Id
                };

                _context.ClassEntitiesStudents.Add(classStudent);
                await _context.SaveChangesAsync();
                return classStudent;
            } catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        /// <summary>
        /// Removes a class entity (not implemented).
        /// </summary>
        /// <param name="classEntity">The class entity to be removed.</param>
        /// <exception cref="NotImplementedException">Thrown as removal is not implemented.</exception>
        public void Remove(ClassEntities classEntity)
        {
            throw new NotImplementedException();
        }
    }
}
