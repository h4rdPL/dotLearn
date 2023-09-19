using dotLearn.Domain.Entities;
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
        modelBuilder.Entity<Student>()
            .HasMany(s => s.Classes)
            .WithMany(c => c.Students)
            .UsingEntity<ClassEntitiesStudent>(
                j => j
                    .HasOne(ce => ce.ClassEntities)
                    .WithMany()
                    .HasForeignKey(ce => ce.ClassEntitiesId),
                j => j
                    .HasOne(s => s.Student)
                    .WithMany()
                    .HasForeignKey(ce => ce.StudentId),
                j =>
                {
                    j.HasKey(ce => new { ce.ClassEntitiesId, ce.StudentId });
                    j.ToTable("ClassEntitiesStudents"); // Dodaj nazwę tabeli pośredniczącej
                });

        modelBuilder.Entity<TestClass>()
            .HasOne(t => t.Professor)
            .WithMany()
            .HasForeignKey(t => t.ProfessorId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<ClassEntitiesStudent>()
            .HasKey(ce => new { ce.ClassEntitiesId, ce.StudentId });

        modelBuilder.Entity<ClassEntitiesStudent>()
            .HasOne(ce => ce.Student)
            .WithMany(s => s.ClassEntitiesStudents) // Zmień na właściwość w klasie Student, która przechowuje ClassEntitiesStudent
            .HasForeignKey(ce => ce.StudentId);

        modelBuilder.Entity<ClassEntitiesStudent>()
            .HasOne(ce => ce.ClassEntities)
            .WithMany(c => c.ClassEntitiesStudents) // Zmień na właściwość w klasie ClassEntities, która przechowuje ClassEntitiesStudent
            .HasForeignKey(ce => ce.ClassEntitiesId);

        modelBuilder.Entity<TestClass>()
            .HasMany(t => t.ClassEntitiesStudents)
            .WithMany()
            .UsingEntity<ClassEntitiesStudent>(
                j => j.HasOne(ce => ce.TestClass)
                    .WithMany()
                    .HasForeignKey(ce => ce.TestClassId),
                j => j.HasOne(s => s.Student)
                    .WithMany()
                    .HasForeignKey(ce => ce.StudentId),
                j =>
                {
                    j.Property(ce => ce.TestClassId);
                    j.Property(ce => ce.StudentId);
                });

        base.OnModelCreating(modelBuilder);
    }



}
