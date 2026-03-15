using WorkshopTracker.API.Application.DTOs.Colaborador;
using WorkshopTracker.API.Application.Interfaces;

namespace WorkshopTracker.API.Application.Services;

public class ColaboradorService : IColaboradorService
{
    // Injeção de dependência do repositório
    private readonly IColaboradorRepository _repository;

    public ColaboradorService(IColaboradorRepository repository)
    {
        _repository = repository;
    }

    // Método auxiliar para converter entidade em DTO de resposta
    private static ColaboradorResponseDto ToResponseDto(Colaborador colaborador)
    {
        return new ColaboradorResponseDto
        {
            Id = colaborador.Id,
            Nome = colaborador.Nome
        };
    }

    // Implementação dos métodos do serviço
    public async Task<ColaboradorResponseDto?> GetByIdAsync(int id)
    {
        var colaborador = await _repository.GetByIdAsync(id);
        if (colaborador == null) return null;
        return ToResponseDto(colaborador);
    }

    public async Task<IEnumerable<ColaboradorResponseDto>> GetAllAsync()
    {
        var colaboradores = await _repository.GetAllAsync();
        return colaboradores.Select(ToResponseDto);
    }

    public async Task<ColaboradorResponseDto> AddAsync(ColaboradorRequestDto dto)
    {
        var colaborador = new Colaborador
        {
            Nome = dto.Nome
        };
        var criado = await _repository.AddAsync(colaborador);
        return ToResponseDto(criado);
    }

    public async Task UpdateAsync(int id, ColaboradorRequestDto dto)
    {
        var colaborador = await _repository.GetByIdAsync(id);
        if (colaborador == null) return;

        colaborador.Nome = dto.Nome;
        await _repository.UpdateAsync(colaborador);
    }

    public async Task DeleteAsync(int id)
    {
        await _repository.DeleteAsync(id);
    }

    public async Task<IEnumerable<ColaboradorResponseDto>> GetByWorkshopIdAsync(int workshopId)
    {
        var colaboradores = await _repository.GetByWorkshopIdAsync(workshopId);
        return colaboradores.Select(ToResponseDto);
    }
}