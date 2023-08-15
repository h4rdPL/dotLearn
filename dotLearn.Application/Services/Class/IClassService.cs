using dotLearn.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using static dotLearn.Application.Services.Class.ClassService;

namespace dotLearn.Application.Services.Class
{
    public interface IClassService
    {
        Task<ClassEntities> Create(ClassEntities newClass);
        public void Delete(ClassEntities myClass);
        Task<ClassEntities> JoinClass(Guid classCode, Guid studentId); // Update the method signature
        public Task<bool> RemoveStudentFromClass(Guid classId, Guid studentId);
        public Task<bool> RemoveClass(Guid classId);
    }
}
