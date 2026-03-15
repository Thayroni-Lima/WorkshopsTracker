using Microsoft.EntityFrameworkCore;

namespace WorkshopTracker.API.Infrastructure.Data;

public static class SeedData
{
    public static void Initialize(AppDbContext db)
    {
        db.Database.Migrate();

        if (!db.Colaboradores.Any())
        {
            db.Colaboradores.AddRange(
                new Colaborador { Nome = "Ana Silva" },
                new Colaborador { Nome = "Carlos Souza" },
                new Colaborador { Nome = "Mariana Costa" },
                new Colaborador { Nome = "Pedro Alves" },
                new Colaborador { Nome = "Juliana Ferreira" }
            );
            db.SaveChanges();
        }
        

        if (!db.Workshops.Any())
        {
            db.Workshops.AddRange(
                new Workshop
                {
                    Nome = "Clean Architecture na prática",
                    Descricao = "Workshop sobre organização de projetos .NET",
                    DataRealizacao = new DateTime(2025, 3, 20, 16, 0, 0)
                },
                new Workshop
                {
                    Nome = "Docker do zero",
                    Descricao = "Containerização de aplicações modernas",
                    DataRealizacao = new DateTime(2025, 6, 15, 16, 0, 0)
                },
                new Workshop
                {
                    Nome = "Angular na prática",
                    Descricao = "Construindo SPAs modernas com Angular",
                    DataRealizacao = new DateTime(2025, 9, 10, 16, 0, 0)
                }
            );
            db.SaveChanges();
        }
    }
}