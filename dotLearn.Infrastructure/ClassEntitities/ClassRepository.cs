using dotLearn.Application.Common.Interfaces.Authentication;
using dotLearn.Application.Common.Interfaces.ClassPersistence;
using dotLearn.Application.Common.Interfaces.Persisence;
using dotLearn.Domain.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Infrastructure.ClassEntitities
{
    public class ClassRepository : IClassRepository
    {

        private readonly DotLearnDbContext _context;
        public ClassRepository(DotLearnDbContext context)
        {
            _context = context;

        }
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

        public void Remove(ClassEntities classEntity)
        {
            throw new NotImplementedException();
        }
    }
}
