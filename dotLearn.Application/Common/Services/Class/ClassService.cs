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

namespace dotLearn.Application.Services.Class
{
    public partial class ClassService : IClassService
    {
        private readonly IClassRepository _classRepository;
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;

        public ClassService(IClassRepository classRepository, IUserRepository userRepository, IHttpContextAccessor contextAccessor, IJwtTokenGenerator jwtTokenGenerator)
        {
            _classRepository = classRepository;
            _userRepository = userRepository;
            _contextAccessor = contextAccessor;
            _jwtTokenGenerator = jwtTokenGenerator;
        }
        /// <summary>
        /// Creates a new class.
        /// </summary>
        /// <param name="newClass">The class entity to be created.</param>
        /// <returns>Returns the newly created class entity.</returns>
        public async Task<ClassEntities> Create(ClassEntities newClass)
        {
            var jwtToken = _contextAccessor.HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", string.Empty);
            var jwtSecurityToken = _jwtTokenGenerator.Verify(jwtToken);
            var professorEmailClaim = jwtSecurityToken.Claims.First(c => c.Type == "email").Value;
            var professorId = _userRepository.ReturnIdOfUserByEmail(professorEmailClaim);

            var myStudent = new List<Student>();
            

            var classEntities = new ClassEntities
            {
                ClassName = newClass.ClassName,
                ClassCode = Guid.NewGuid(),
                ProfessorId = professorId,
                Students = new List<Student>()
            };

            foreach (var studentData in newClass.Students)
            {
                var student = _userRepository.GetStudentByCardId(studentData.CardId);
                classEntities.Students.Add(student);
            }

            _classRepository.Create(classEntities);

            // Save changes to the database (implement this part)

            return classEntities;
        }


        /// <summary>
        /// Deletes a class.
        /// </summary>
        /// <param name="myClass">The class entity to be deleted.</param>
        public void Delete(ClassEntities myClass)
        {
            _classRepository.Remove(myClass);
        }

        /// <summary>
        /// Removes a student from a class.
        /// </summary>
        /// <param name="classCode">The code of the class.</param>
        /// <param name="studentId">The ID of the student to be removed.</param>
        /// <returns>Returns true if the student was successfully removed, otherwise false.</returns>
 
        //public async Task<bool> RemoveStudentFromClass(int classCode, int studentId)
        //{
        //    var classContainingStudent = _class.FirstOrDefault(cls => cls.Id == classCode);

        //    if (classContainingStudent != null)
        //    {
        //        var studentToRemove = classContainingStudent.Students.FirstOrDefault(st => st.Id == studentId);
        //        if (studentToRemove != null)
        //        {
        //            classContainingStudent.Students.Remove(studentToRemove);
        //            return true;
        //        }
        //    }

        //    return false;
        //}

        /// <summary>
        /// Removes a class.
        /// </summary>
        /// <param name="classId">The ID of the class to be removed.</param>
        /// <returns>Returns true if the class was successfully removed, otherwise false.</returns>

        //public async Task<bool> RemoveClass(int classId)
        //{
        //    var classToRemove = _class.FirstOrDefault(c => c.Id == classId);

        //    if (classToRemove != null)
        //    {
        //        _class.Remove(classToRemove);
        //        return await Task.FromResult(true);
        //    }

        //    return await Task.FromResult(false);
        //}

        /// <summary>
        /// Joins a student to a class.
        /// </summary>
        /// <param name="classCode">The code of the class.</param>
        /// <param name="studentId">The ID of the student to be joined.</param>
        /// <returns>Returns the updated class entity after joining the student.</returns>
        /// <exception cref="ArgumentException">Thrown when the class does not exist.</exception>
  
        //public Task<ClassEntities> JoinClass(int classCode, Guid studentId)
        //{
        //    var classToJoin = _class.FirstOrDefault(c => c.Id == classCode);
        //    var student = _students.FirstOrDefault(s => s.Equals(studentId));
        //    if (classToJoin != null)
        //    {
        //        classToJoin.Students?.Add(student);
        //    }
        //    else
        //    {
        //        throw new ArgumentException($"Klasa o identyfikatorze {classCode} nie istnieje.");
        //    }
        //    return Task.FromResult(classToJoin);
        //}

        public Task<bool> RemoveStudentFromClass(int classId, Guid studentId)
        {
            throw new NotImplementedException();
        }
    }
}