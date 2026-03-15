// Importa os namespaces necessários
using Microsoft.EntityFrameworkCore;
using WorkshopTracker.API.Application.Interfaces;
using WorkshopTracker.API.Application.Services;
using WorkshopTracker.API.Endpoints;
using WorkshopTracker.API.Infrastructure.Data;
using WorkshopTracker.API.Infrastructure.Repositories;

// Carrega as variáveis de ambiente do arquivo .env
DotNetEnv.Env.Load("../../.env");

// Configura o builder do aplicativo
var builder = WebApplication.CreateBuilder(args);

// Configura a string de conexão usando as variáveis de ambiente
var connectionString =
    $"Server={Environment.GetEnvironmentVariable("DB_HOST")};" +
    $"Port={Environment.GetEnvironmentVariable("DB_PORT")};" +
    $"Database={Environment.GetEnvironmentVariable("DB_NAME")};" +
    $"User={Environment.GetEnvironmentVariable("DB_USER")};" +
    $"Password={Environment.GetEnvironmentVariable("DB_PASSWORD")};";

// Configura o DbContext para usar MySQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 0))));

// Adiciona serviços para repositórios e serviços de aplicação
builder.Services.AddScoped<IColaboradorRepository, ColaboradorRepository>();
builder.Services.AddScoped<IColaboradorService, ColaboradorService>();
builder.Services.AddScoped<IWorkshopRepository, WorkshopRepository>();
builder.Services.AddScoped<IWorkshopService, WorkshopService>();

// Configura CORS para permitir solicitações de qualquer origem
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Adiciona serviços para controladores e documentação Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Adiciona serviços para controladores
var app = builder.Build();

// Configura o middleware para usar Swagger e Swagger UI
app.UseSwagger();
app.UseSwaggerUI();

// Configura o middleware para usar CORS
app.UseCors("AllowAll");

// Mapeia os endpoints para colaboradores e workshops
app.MapColaboradorEndpoints();
app.MapWorkshopEndpoints();

// Configura o pipeline de middleware
app.Run();