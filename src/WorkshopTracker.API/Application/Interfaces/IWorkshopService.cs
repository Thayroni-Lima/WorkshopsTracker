using WorkshopTracker.API.Application.DTOs.Workshop;

namespace WorkshopTracker.API.Application.Interfaces;

public interface IWorkshopService
{
    Task<WorkshopResponseDto?> GetByIdAsync(int id);
    Task<IEnumerable<WorkshopResponseDto>> GetAllAsync();
    Task<WorkshopResponseDto> AddAsync(WorkshopRequestDto dto);
    Task UpdateAsync(int id, WorkshopRequestDto dto);
    Task DeleteAsync(int id);
    Task<IEnumerable<WorkshopResponseDto>> GetByColaboradorIdAsync(int colaboradorId);
    Task AddColaboradorAsync(int workshopId, int colaboradorId);
    Task RemoveColaboradorAsync(int workshopId, int colaboradorId);
}