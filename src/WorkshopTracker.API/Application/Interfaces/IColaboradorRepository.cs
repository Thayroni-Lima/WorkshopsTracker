namespace WorkshopTracker.API.Application.Interfaces;

public interface IColaboradorRepository{
    Task<Colaborador?> GetByIdAsync(int id);
    Task<IEnumerable<Colaborador>> GetAllAsync();
    Task<Colaborador> AddAsync(Colaborador colaborador);
    Task UpdateAsync(Colaborador colaborador);
    Task DeleteAsync(int id);
    Task<IEnumerable<Colaborador>> GetByWorkshopIdAsync(int workshopId);
}