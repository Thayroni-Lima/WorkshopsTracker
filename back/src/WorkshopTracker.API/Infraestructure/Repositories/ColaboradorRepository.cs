using Microsoft.EntityFrameworkCore;
using WorkshopTracker.API.Application.Interfaces;
using WorkshopTracker.API.Infrastructure.Data;

namespace WorkshopTracker.API.Infrastructure.Repositories;

public class ColaboradorRepository : IColaboradorRepository
{
    // Repositório para gerenciar os colaboradores
    private readonly AppDbContext _context;

    public ColaboradorRepository(AppDbContext context)
    {
        _context = context;
    }

    // Implementação dos métodos do repositório

    public async Task<Colaborador?> GetByIdAsync(int id)
    {
        return await _context.Colaboradores
            .FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<IEnumerable<Colaborador>> GetAllAsync()
    {
        return await _context.Colaboradores.ToListAsync();
    }

    public async Task<Colaborador> AddAsync(Colaborador colaborador)
    {
        _context.Colaboradores.Add(colaborador);
        await _context.SaveChangesAsync();
        return colaborador;
    }

    public async Task UpdateAsync(Colaborador colaborador)
    {
        _context.Colaboradores.Update(colaborador);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var colaborador = await GetByIdAsync(id);
        if (colaborador != null)
        {
            _context.Colaboradores.Remove(colaborador);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<Colaborador>> GetByWorkshopIdAsync(int workshopId)
    {
        return await _context.WorkshopColaboradores
            .Where(wc => wc.WorkshopId == workshopId)
            .Select(wc => wc.Colaborador)
            .ToListAsync();
    }
}