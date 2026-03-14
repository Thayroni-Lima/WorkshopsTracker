public class WorkshopColaborador
{
    public int WorkshopId { get; }
    public int ColaboradorId { get; }

    // navigation properties → aponta para as entidades que essa tabela liga
    public Workshop Workshop { get; set; }
    public Colaborador Colaborador { get; set; }
}