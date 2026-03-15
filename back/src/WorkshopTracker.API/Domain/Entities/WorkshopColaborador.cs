public class WorkshopColaborador
{
    public int WorkshopId { get; set;}
    public int ColaboradorId { get; set;}

    // navigation properties → aponta para as entidades que essa tabela liga
    public Workshop Workshop { get; set; }
    public Colaborador Colaborador { get; set; }
}