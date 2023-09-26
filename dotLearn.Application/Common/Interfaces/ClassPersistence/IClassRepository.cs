using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using dotLearn.Domain.DTO;
using dotLearn.Domain.Entities;

namespace dotLearn.Application.Common.Interfaces.ClassPersistence
{
    public interface IClassRepository
    {
        Task<ClassEntities> Create(ClassEntities classEntity);
        List<StudentAndProfessorClassesDTO> GetAll(User user);
        void Remove(ClassEntities classEntity);
    }
}
