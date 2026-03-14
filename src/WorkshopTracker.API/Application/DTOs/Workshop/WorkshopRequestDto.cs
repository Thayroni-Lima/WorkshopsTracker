namespace WorkshopTracker.API.Application.DTOs.Workshop;

public class WorkshopRequestDto
{
    public string Nome { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public DateTime DataRealizacao { get; set; }
}