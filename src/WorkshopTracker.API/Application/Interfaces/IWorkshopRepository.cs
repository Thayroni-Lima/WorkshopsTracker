namespace WorkshopTracker.API.Application.Interfaces;

public interface IWorkshopRepository{
    Task<Workshop?> GetByIdAsync(int id);
    Task<IEnumerable<Workshop>> GetAllAsync();
    Task<Workshop> AddAsync(Workshop workshop);
    Task UpdateAsync(Workshop workshop);
    Task DeleteAsync(int id);
    Task<IEnumerable<Workshop>> GetByColaboradorIdAsync(int colaboradorId);
    Task AddColaboradorAsync(int workshopId, int colaboradorId);
    Task RemoveColaboradorAsync(int workshopId, int colaboradorId);
}