using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using dotLearn.Domain.Entities;

namespace dotLearn.Application.Common.Interfaces.ClassPersistence
{
    public interface IClassRepository
    {
        Task<ClassEntities> Create(ClassEntities classEntity);
        void Remove(ClassEntities classEntity);
    }
}
