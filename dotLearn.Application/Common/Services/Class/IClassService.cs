using dotLearn.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Application.Common.Services.Class
{
    public interface IClassService
    {
        Task<ClassEntities> Create(ClassEntities newClass);
        public void Delete(ClassEntities myClass);
        Task<ClassEntities> JoinClass(int classCode, Guid studentId); // Update the method signature
        public Task<bool> RemoveStudentFromClass(int classId, Guid studentId);
        public Task<bool> RemoveClass(int classId);
    }
}
