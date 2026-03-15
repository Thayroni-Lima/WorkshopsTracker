using WorkshopTracker.API.Application.DTOs.Colaborador;

namespace WorkshopTracker.API.Application.DTOs.Workshop;

public class WorkshopResponseDto
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public DateTime DataRealizacao { get; set; }
    public List<ColaboradorResponseDto> Colaboradores { get; set; } = new List<ColaboradorResponseDto>();
}