using Microsoft.EntityFrameworkCore;
using WorkshopTracker.API.Infrastructure.Data;
// Carrega as variáveis de ambiente do arquivo .env
DotNetEnv.Env.Load("../../.env");

var builder = WebApplication.CreateBuilder(args);

var connectionString =
    $"Server={Environment.GetEnvironmentVariable("DB_HOST")};" +
    $"Port={Environment.GetEnvironmentVariable("DB_PORT")};" +
    $"Database={Environment.GetEnvironmentVariable("DB_NAME")};" +
    $"User={Environment.GetEnvironmentVariable("DB_USER")};" +
    $"Password={Environment.GetEnvironmentVariable("DB_PASSWORD")};";

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 0))));

var app = builder.Build();

app.Run();