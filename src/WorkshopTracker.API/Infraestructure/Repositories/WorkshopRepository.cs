using Microsoft.EntityFrameworkCore;
using WorkshopTracker.API.Application.Interfaces;
using WorkshopTracker.API.Infrastructure.Data;

namespace WorkshopTracker.API.Infrastructure.Repositories;

public class WorkshopRepository : IWorkshopRepository
{
    // Repositório para gerenciar os workshops e suas relações com colaboradores
    private readonly AppDbContext _context;

    public WorkshopRepository(AppDbContext context)
    {
        _context = context;
    }

    // Implementação dos métodos do repositório

    public async Task<Workshop> GetByIdAsync(int id)
    {
        return await _context.Workshops
            .Include(w => w.WorkshopColaboradores)
                .ThenInclude(wc => wc.Colaborador)
            .FirstOrDefaultAsync(w => w.Id == id);
    }

    public async Task<IEnumerable<Workshop>> GetAllAsync()
    {
        return await _context.Workshops
            .Include(w => w.WorkshopColaboradores)
                .ThenInclude(wc => wc.Colaborador)
            .ToListAsync();
    }

    public async Task<Workshop> AddAsync(Workshop workshop)
    {
        _context.Workshops.Add(workshop);
        await _context.SaveChangesAsync();
        return workshop;
    }

    public async Task UpdateAsync(Workshop workshop)
    {
        _context.Workshops.Update(workshop);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var workshop = await GetByIdAsync(id);
        if (workshop != null)
        {
            _context.Workshops.Remove(workshop);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<Workshop>> GetByColaboradorIdAsync(int colaboradorId)
    {
        return await _context.WorkshopColaboradores
            .Where(wc => wc.ColaboradorId == colaboradorId)
            .Select(wc => wc.Workshop)
            .ToListAsync();
    }

    public async Task AddColaboradorAsync(int workshopId, int colaboradorId)
    {
        var workshopColaborador = new WorkshopColaborador
        {
            WorkshopId = workshopId,
            ColaboradorId = colaboradorId
        };
        _context.WorkshopColaboradores.Add(workshopColaborador);
        await _context.SaveChangesAsync();
    }

    public async Task RemoveColaboradorAsync(int workshopId, int colaboradorId)
    {
        var workshopColaborador = await _context.WorkshopColaboradores
            .FirstOrDefaultAsync(wc => wc.WorkshopId == workshopId && wc.ColaboradorId == colaboradorId);
        
        if (workshopColaborador != null)
        {
            _context.WorkshopColaboradores.Remove(workshopColaborador);
            await _context.SaveChangesAsync();
        }
    }
}