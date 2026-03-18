import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WorkshopService } from '../../../core/services/workshop.service';
import { ColaboradorService } from '../../../core/services/colaborador.service';
import { Colaborador } from '../../../models/colaborador.model';

@Component({
  selector: 'app-workshop-colaboradores',
  imports: [CommonModule, RouterLink],
  templateUrl: './workshop-colaboradores.html',
  styleUrl: './workshop-colaboradores.css',
})
export class WorkshopColaboradores implements OnInit {
  workshopId = signal<number>(0);
  colaboradores = signal<Colaborador[]>([]);
  todosColaboradores = signal<Colaborador[]>([]);
  loading = signal(true);
  error = signal('');

  disponiveis = computed(() =>
    this.todosColaboradores().filter((c) => !this.colaboradores().some((a) => a.id === c.id)),
  );

  constructor(
    private workshopService: WorkshopService,
    private colaboradorService: ColaboradorService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.workshopId.set(id);
    this.carregarDados();
  }

  carregarDados(): void {
    this.loading.set(true);

    this.workshopService.getColaboradoresByWorkshopId(this.workshopId()).subscribe({
      next: (data) => {
        this.colaboradores.set(data);
        this.loading.set(false);
      },
      error: () => this.error.set('Erro ao carregar colaboradores do workshop.'),
    });

    this.colaboradorService.getAll().subscribe({
      next: (data) => this.todosColaboradores.set(data),
    });
  }

  adicionar(colaboradorId: number): void {
    this.workshopService.postColaboradorToWorkshop(this.workshopId(), colaboradorId).subscribe({
      next: () => this.carregarDados(),
      error: () => this.error.set('Erro ao adicionar colaborador.'),
    });
  }

  remover(colaboradorId: number): void {
    this.workshopService.deleteColaboradorFromWorkshop(this.workshopId(), colaboradorId).subscribe({
      next: () => this.carregarDados(),
      error: () => this.error.set('Erro ao remover colaborador.'),
    });
  }
}
