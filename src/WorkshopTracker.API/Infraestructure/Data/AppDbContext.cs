using Microsoft.EntityFrameworkCore;

namespace WorkshopTracker.API.Infrastructure.Data;

public class AppDbContext : DbContext
{
    // construtor → recebe as configurações de conexão injetadas pelo Program.cs
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // cada DbSet representa uma tabela no banco
    public DbSet<Workshop> Workshops { get; set; }
    public DbSet<Colaborador> Colaboradores { get; set; }
    public DbSet<WorkshopColaborador> WorkshopColaboradores { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // configura a chave composta da tabela de junção
        modelBuilder.Entity<WorkshopColaborador>()
            .HasKey(wc => new { wc.WorkshopId, wc.ColaboradorId });

        // configura o relacionamento WorkshopColaborador -> Workshop
        modelBuilder.Entity<WorkshopColaborador>()
            .HasOne(wc => wc.Workshop)
            .WithMany(w => w.WorkshopColaboradores)
            .HasForeignKey(wc => wc.WorkshopId);

        // configura o relacionamento WorkshopColaborador -> Colaborador
        modelBuilder.Entity<WorkshopColaborador>()
            .HasOne(wc => wc.Colaborador)
            .WithMany(c => c.WorkshopColaboradores)
            .HasForeignKey(wc => wc.ColaboradorId);
    }
}