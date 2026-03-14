using WorkshopTracker.API.Application.DTOs.Colaborador;

namespace WorkshopTracker.API.Application.Interfaces;

public interface IColaboradorService
{
    Task<ColaboradorResponseDto?> GetByIdAsync(int id);
    Task<IEnumerable<ColaboradorResponseDto>> GetAllAsync();
    Task<ColaboradorResponseDto> AddAsync(ColaboradorRequestDto dto);
    Task UpdateAsync(int id, ColaboradorRequestDto dto);
    Task DeleteAsync(int id);
    Task<IEnumerable<ColaboradorResponseDto>> GetByWorkshopIdAsync(int workshopId);
}