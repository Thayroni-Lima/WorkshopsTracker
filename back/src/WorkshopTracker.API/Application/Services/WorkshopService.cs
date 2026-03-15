using WorkshopTracker.API.Application.DTOs.Workshop;
using WorkshopTracker.API.Application.DTOs.Colaborador;
using WorkshopTracker.API.Application.Interfaces;

namespace WorkshopTracker.API.Application.Services;

public class WorkshopService : IWorkshopService
{
    // Injeção de dependência do repositório
    private readonly IWorkshopRepository _repository;

    public WorkshopService(IWorkshopRepository repository)
    {
        _repository = repository;
    }

    // Métodos auxiliares para converter entidade em DTO de resposta
    private static ColaboradorResponseDto ToResponseDto(Colaborador colaborador)
    {
        return new ColaboradorResponseDto
        {
            Id = colaborador.Id,
            Nome = colaborador.Nome
        };
    }

    private static WorkshopResponseDto ToResponseDto(Workshop workshop)
    {
        return new WorkshopResponseDto
        {
            Id = workshop.Id,
            Nome = workshop.Nome,
            Descricao = workshop.Descricao,
            DataRealizacao = workshop.DataRealizacao,
            Colaboradores = workshop.WorkshopColaboradores
                .Select(wc => ToResponseDto(wc.Colaborador))
                .ToList()
        };
    }

    // Implementação dos métodos do serviço

    public async Task<WorkshopResponseDto?> GetByIdAsync(int id)
    {
        var workshop = await _repository.GetByIdAsync(id);
        if (workshop == null) return null;
        return ToResponseDto(workshop);
    }

    public async Task<IEnumerable<WorkshopResponseDto>> GetAllAsync()
    {
        var workshops = await _repository.GetAllAsync();
        return workshops.Select(ToResponseDto);
    }

    public async Task<WorkshopResponseDto> AddAsync(WorkshopRequestDto dto)
    {
        var workshop = new Workshop
        {
            Nome = dto.Nome,
            Descricao = dto.Descricao,
            DataRealizacao = dto.DataRealizacao
        };
        var criado = await _repository.AddAsync(workshop);
        return ToResponseDto(criado);
    }

    public async Task UpdateAsync(int id, WorkshopRequestDto dto)
    {
        var workshop = await _repository.GetByIdAsync(id);
        if (workshop == null) return;

        workshop.Nome = dto.Nome;
        workshop.Descricao = dto.Descricao;
        workshop.DataRealizacao = dto.DataRealizacao;

        await _repository.UpdateAsync(workshop);
    }
    
    public async Task DeleteAsync(int id)
    {
        await _repository.DeleteAsync(id);
    }

    public async Task<IEnumerable<WorkshopResponseDto>> GetByColaboradorIdAsync(int colaboradorId)
    {
        var workshops = await _repository.GetByColaboradorIdAsync(colaboradorId);
        return workshops.Select(ToResponseDto);
    }

    public async Task AddColaboradorAsync(int workshopId, int colaboradorId)
    {
        // Verificar se o workshop existe
        var workshop = await _repository.GetByIdAsync(workshopId);
        if (workshop == null) return;
        
        // Verificar se o colaborador já está associado ao workshop
        if (workshop.WorkshopColaboradores.Any(wc => wc.ColaboradorId == colaboradorId)) return;

        await _repository.AddColaboradorAsync(workshopId, colaboradorId);

    }

    public async Task RemoveColaboradorAsync(int workshopId, int colaboradorId)
    {
        // Verificar se o workshop existe
        var workshop = await _repository.GetByIdAsync(workshopId);
        if (workshop == null) return;

        // Verificar se o colaborador está associado ao workshop
        var existe = workshop.WorkshopColaboradores.Any(wc => wc.ColaboradorId == colaboradorId);
        if (!existe) return;

        await _repository.RemoveColaboradorAsync(workshopId, colaboradorId);
    }
}