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

namespace dotLearn.Application.Services.Class
{
    public partial class ClassService : IClassService
    {
        private static List<ClassEntities> _class = new List<ClassEntities>();
        private static List<Student> _students = new List<Student>();   
       /// <summary>
       /// 
       /// </summary>
       /// <param name="newClass"></param>
       /// <returns></returns>
        public async Task<ClassEntities> Create(ClassEntities newClass)
        {
            _class.Add(newClass);
            return await Task.FromResult(newClass);
        }

        public void Delete(ClassEntities myClass)
        {
            _class.Remove(myClass);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="classCode"></param>
        /// <param name="studentId"></param>
        /// <returns></returns>
        public async Task<bool> RemoveStudentFromClass(Guid classCode, Guid studentId)
        {
            var classContainingStudent = _class.FirstOrDefault(cls => cls.ClassCode == classCode);

            if (classContainingStudent != null)
            {
                var studentToRemove = classContainingStudent.Student.FirstOrDefault(st => st.Guid == studentId);
                if (studentToRemove != null)
                {
                    classContainingStudent.Student.Remove(studentToRemove);
                    return true;
                }
            }

            return false;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="classId"></param>
        /// <returns></returns>
        public async Task<bool> RemoveClass(Guid classId)
        {
            var classToRemove = _class.FirstOrDefault(c => c.ClassCode == classId);

            if (classToRemove != null)
            {
                _class.Remove(classToRemove);
                return await Task.FromResult(true);
            }

            return await Task.FromResult(false);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="classCode"></param>
        /// <param name="studentId"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        public Task<ClassEntities> JoinClass(Guid classCode, Guid studentId)
        {
            var classToJoin = _class.FirstOrDefault(c => c.ClassCode == classCode);
            var student = _students.FirstOrDefault(s => s.Equals(studentId));
            if (classToJoin != null)
            {
                classToJoin.Student?.Add(student);
            }
            else
            {
                throw new ArgumentException($"Klasa o identyfikatorze {classCode} nie istnieje.");
            }
            return Task.FromResult(classToJoin);
        }
    }
}