public class Colaborador
{
    public int Id { get; set; }
    public string Nome { get; set; }

     // navigation property -> EF Core usa isso para fazer JOIN com WorkshopColaborador
    public ICollection<WorkshopColaborador> WorkshopColaboradores { get; set; } = new List<WorkshopColaborador>();
}