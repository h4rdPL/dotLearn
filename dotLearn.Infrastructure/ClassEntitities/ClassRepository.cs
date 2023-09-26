using dotLearn.Application.Common.Interfaces.Authentication;
using dotLearn.Application.Common.Interfaces.ClassPersistence;
using dotLearn.Application.Common.Interfaces.Persisence;
using dotLearn.Domain.DTO;
using dotLearn.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
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

        public List<StudentAndProfessorClassesDTO> GetAll(User user)
        {
            var classesWithProfessors = _context.ClassEntitiesStudents
                .Where(ces => ces.StudentId == user.Id)
                .SelectMany(ces =>
                    _context.Classes
                        .Include(ce => ce.Professor) // Load the professor
                        .Where(ce => ce.Id == ces.ClassEntitiesId)
                        .Select(ce => new StudentAndProfessorClassesDTO
                        {
                            ClassName = ce.ClassName,
                            FirstName = ce.Professor.FirstName, // Create a list with the professor
                            LastName = ce.Professor.LastName
                        })
                )
                .ToList();

            return classesWithProfessors;
        }



        public void Remove(ClassEntities classEntity)
        {
            throw new NotImplementedException();
        }
    }
}
