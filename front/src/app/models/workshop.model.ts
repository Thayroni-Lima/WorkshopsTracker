import { Colaborador } from "./colaborador.model";

export interface Workshop {
  id: number;
  nome: string;
  descricao: string;
  dataRealizacao: string;
  colaboradores: Colaborador[];
}
