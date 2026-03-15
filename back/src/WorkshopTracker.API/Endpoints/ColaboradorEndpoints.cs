using WorkshopTracker.API.Application.DTOs.Colaborador;
using WorkshopTracker.API.Application.Interfaces;

namespace WorkshopTracker.API.Endpoints;
public static class ColaboradorEndpoints
{
    public static void MapColaboradorEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/colaboradores").WithTags("Colaboradores");

        // GET: api/colaboradores
        group.MapGet("/", async (IColaboradorService service) =>
        {
            var colaboradores = await service.GetAllAsync();
            return Results.Ok(colaboradores);
        });
    
        // GET: api/colaboradores/{id}
        group.MapGet("/{id}", async (int id, IColaboradorService service) =>
        {
            var colaborador = await service.GetByIdAsync(id);
            return colaborador is null
                ? Results.NotFound()
                : Results.Ok(colaborador);
        });

        // POST: api/colaboradores
        group.MapPost("/", async (ColaboradorRequestDto dto, IColaboradorService service) =>
        {
            var criado = await service.AddAsync(dto);
            return Results.Created($"/api/colaboradores/{criado.Id}", criado);
        });

        // PUT: api/colaboradores/{id}
        group.MapPut("/{id}", async (int id, ColaboradorRequestDto dto, IColaboradorService service) =>
        {
            await service.UpdateAsync(id, dto);
            return Results.NoContent();
        });

        // DELETE: api/colaboradores/{id}
        group.MapDelete("/{id}", async (int id, IColaboradorService service) =>
        {
            await service.DeleteAsync(id);
            return Results.NoContent();
        });
    
        // GET: api/colaboradores/{id}/workshops
        // Retorna os workshops associados a um colaborador específico
        group.MapGet("/{id}/workshops", async (int id, IWorkshopService workshopService) =>
        {
            var workshops = await workshopService.GetByColaboradorIdAsync(id);
            return Results.Ok(workshops);
        });
    
    }
}