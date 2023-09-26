using dotLearn.Domain.DTO;
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
        Task<ClassEntities> Create(ClassDTO newClass);
        public void Delete(ClassEntities myClass);
        List<StudentAndProfessorClassesDTO> GetClass();
    }
}
