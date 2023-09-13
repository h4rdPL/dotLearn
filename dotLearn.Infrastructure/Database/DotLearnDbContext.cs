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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TestClass>()
            .HasOne(t => t.Professor)
            .WithMany()
            .HasForeignKey(t => t.ProfessorId) // Użyj ProfessorId jako klucza obcego
            .OnDelete(DeleteBehavior.Restrict);

        // Dodaj inne konfiguracje relacji i opcji usuwania tutaj

        base.OnModelCreating(modelBuilder);
    }

}
