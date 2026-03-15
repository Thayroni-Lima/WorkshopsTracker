public class Workshop
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public DateTime DataRealizacao { get; set; }
    public string Descricao { get; set; }

     // navigation property -> EF Core usa isso para fazer JOIN com WorkshopColaborador
    public ICollection<WorkshopColaborador> WorkshopColaboradores { get; set; } = new List<WorkshopColaborador>();
}