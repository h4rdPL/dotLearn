using dotLearn.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Infrastructure.Database
{
    public class DotLearnDbContext : DbContext
    {
        public DotLearnDbContext(DbContextOptions<DotLearnDbContext> options) : base(options)
        {   
        }
        public DbSet<ClassEntities> Classes { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Professor> Professors { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<TestClass> Tests { get; set; }
        public DbSet<FlashCard> FlashCards { get; set; }

    }
}
