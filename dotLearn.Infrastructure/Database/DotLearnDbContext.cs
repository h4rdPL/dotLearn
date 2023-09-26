﻿using dotLearn.Domain.Entities;
using Microsoft.EntityFrameworkCore;

public class DotLearnDbContext : DbContext
{
    public DotLearnDbContext(DbContextOptions<DotLearnDbContext> options) : base(options)
    {
    }


    public DbSet<ClassEntities> Classes { get; set; }
    public DbSet<Professor> Professors { get; set; }
    public DbSet<Student> Students { get; set; }
    public DbSet<TestClass> Tests { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<Answer> Answers { get; set; }
    public DbSet<Deck> Decks { get; set; }
    public DbSet<ClassEntitiesStudent> ClassEntitiesStudents { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Professor>()
            .HasMany(x => x.Classes)
            .WithOne(x => x.Professor)
            .HasForeignKey(x => x.ProfessorId)
            .IsRequired();

        modelBuilder.Entity<ClassEntities>()
            .HasMany(x => x.Students)
            .WithMany(x => x.Classes)
            .UsingEntity<ClassEntitiesStudent>();

        modelBuilder.Entity<ClassEntities>()
            .HasMany(x => x.Tests)
            .WithOne(x => x.Class)
            .HasForeignKey(x => x.ClassId)
            .IsRequired();
        modelBuilder.Entity<TestClass>()
            .HasMany(x => x.Questions)
            .WithOne(x => x.Test)
            .HasForeignKey(x => x.TestId)
            .IsRequired();
        modelBuilder.Entity<Question>()
            .HasMany(x => x.Answers)
            .WithOne(x => x.Question)
            .HasForeignKey(x => x.QuestionId)
            .IsRequired();

        base.OnModelCreating(modelBuilder);
    }



}
