using WorkshopTracker.API.Application.DTOs.Workshop;
using WorkshopTracker.API.Application.Interfaces;

namespace WorkshopTracker.API.Endpoints;
public static class WorkshopEndpoints
{
    public static void MapWorkshopEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/workshops").WithTags("Workshops");

        // GET: api/workshops
        group.MapGet("/", async (IWorkshopService service) =>
        {
            var workshops = await service.GetAllAsync();
            return Results.Ok(workshops);
        });
    
        // GET: api/workshops/{id}
        group.MapGet("/{id}", async (int id, IWorkshopService service) =>
        {
            var workshop = await service.GetByIdAsync(id);
            return workshop is null
                ? Results.NotFound()
                : Results.Ok(workshop);
        });

        // POST: api/workshops
        group.MapPost("/", async (WorkshopRequestDto dto,IWorkshopService service) =>
        {
            var criado = await service.AddAsync(dto);
            return Results.Created($"/api/workshops/{criado.Id}", criado);
        });

        // PUT: api/workshops/{id}
        group.MapPut("/{id}", async (int id, WorkshopRequestDto dto, IWorkshopService service) =>
        {
            await service.UpdateAsync(id, dto);
            return Results.NoContent();
        });

        // DELETE: api/workshops/{id}
        group.MapDelete("/{id}", async (int id, IWorkshopService service) =>
        {
            await service.DeleteAsync(id);
            return Results.NoContent();
        });
    
        // GET: api/workshops/{id}/colaboradores
        // Retorna os colaboradores associados a um workshop específico
        group.MapGet("/{id}/colaboradores", async (int id, IColaboradorService colaboradorService) =>
        {
            var colaboradores = await colaboradorService.GetByWorkshopIdAsync(id);
            return Results.Ok(colaboradores);
        });

        // POST: api/workshops/{workshopId}/colaboradores/{colaboradorId}
        // Associa um colaborador a um workshop específico
                group.MapPost("/{workshopId}/colaboradores/{colaboradorId}", async (int workshopId, int colaboradorId, IWorkshopService service) =>
        {
            await service.AddColaboradorAsync(workshopId, colaboradorId);
            return Results.NoContent();
        });

        // DELETE: api/workshops/{workshopId}/colaboradores/{colaboradorId}
        // Remove a associação de um colaborador a um workshop específico
        group.MapDelete("/{workshopId}/colaboradores/{colaboradorId}", async (int workshopId, int colaboradorId, IWorkshopService service) =>
        {
            await service.RemoveColaboradorAsync(workshopId, colaboradorId);
            return Results.NoContent();
        });
    }
}