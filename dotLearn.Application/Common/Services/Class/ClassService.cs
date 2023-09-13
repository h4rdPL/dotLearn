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

namespace dotLearn.Application.Services.Class
{
    public partial class ClassService : IClassService
    {
        private static List<ClassEntities> _class = new List<ClassEntities>();
        private static List<Student> _students = new List<Student>();
        /// <summary>
        /// Creates a new class.
        /// </summary>
        /// <param name="newClass">The class entity to be created.</param>
        /// <returns>Returns the newly created class entity.</returns>
        public async Task<ClassEntities> Create(ClassEntities newClass)
        {
            _class.Add(newClass);
            return await Task.FromResult(newClass);
        }

        /// <summary>
        /// Deletes a class.
        /// </summary>
        /// <param name="myClass">The class entity to be deleted.</param>
        public void Delete(ClassEntities myClass)
        {
            _class.Remove(myClass);
        }

        /// <summary>
        /// Removes a student from a class.
        /// </summary>
        /// <param name="classCode">The code of the class.</param>
        /// <param name="studentId">The ID of the student to be removed.</param>
        /// <returns>Returns true if the student was successfully removed, otherwise false.</returns>
        public async Task<bool> RemoveStudentFromClass(int classCode, int studentId)
        {
            var classContainingStudent = _class.FirstOrDefault(cls => cls.Id == classCode);

            if (classContainingStudent != null)
            {
                var studentToRemove = classContainingStudent.Students.FirstOrDefault(st => st.Id == studentId);
                if (studentToRemove != null)
                {
                    classContainingStudent.Students.Remove(studentToRemove);
                    return true;
                }
            }

            return false;
        }

        /// <summary>
        /// Removes a class.
        /// </summary>
        /// <param name="classId">The ID of the class to be removed.</param>
        /// <returns>Returns true if the class was successfully removed, otherwise false.</returns>
        public async Task<bool> RemoveClass(int classId)
        {
            var classToRemove = _class.FirstOrDefault(c => c.Id == classId);

            if (classToRemove != null)
            {
                _class.Remove(classToRemove);
                return await Task.FromResult(true);
            }

            return await Task.FromResult(false);
        }

        /// <summary>
        /// Joins a student to a class.
        /// </summary>
        /// <param name="classCode">The code of the class.</param>
        /// <param name="studentId">The ID of the student to be joined.</param>
        /// <returns>Returns the updated class entity after joining the student.</returns>
        /// <exception cref="ArgumentException">Thrown when the class does not exist.</exception>
        public Task<ClassEntities> JoinClass(int classCode, Guid studentId)
        {
            var classToJoin = _class.FirstOrDefault(c => c.Id == classCode);
            var student = _students.FirstOrDefault(s => s.Equals(studentId));
            if (classToJoin != null)
            {
                classToJoin.Students?.Add(student);
            }
            else
            {
                throw new ArgumentException($"Klasa o identyfikatorze {classCode} nie istnieje.");
            }
            return Task.FromResult(classToJoin);
        }

        public Task<bool> RemoveStudentFromClass(int classId, Guid studentId)
        {
            throw new NotImplementedException();
        }
    }
}