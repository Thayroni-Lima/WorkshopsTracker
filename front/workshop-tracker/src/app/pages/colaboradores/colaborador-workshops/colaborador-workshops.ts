import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ColaboradorService } from '../../../core/services/colaborador.service';
import { WorkshopService } from '../../../core/services/workshop.service';
import { Workshop } from '../../../models/workshop.model';

@Component({
  selector: 'app-colaborador-workshops',
  imports: [CommonModule, RouterLink],
  templateUrl: './colaborador-workshops.html',
  styleUrl: './colaborador-workshops.css',
})
export class ColaboradorWorkshops implements OnInit {
  colaboradorId = signal<number>(0);
  workshops = signal<Workshop[]>([]);
  todosWorkshops = signal<Workshop[]>([]);
  loading = signal(true);
  error = signal('');

  disponiveis = computed(() =>
    this.todosWorkshops().filter((w) => !this.workshops().some((a) => a.id === w.id)),
  );

  constructor(
    private colaboradorService: ColaboradorService,
    private workshopService: WorkshopService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.colaboradorId.set(id);
    this.carregarDados();
  }

  carregarDados(): void {
    this.loading.set(true);

    this.colaboradorService.getWorkshopsByColaboradorId(this.colaboradorId()).subscribe({
      next: (data) => {
        this.workshops.set(data);
        this.loading.set(false);
      },
      error: () => this.error.set('Erro ao carregar workshops do colaborador.'),
    });

    this.workshopService.getAll().subscribe({
      next: (data) => this.todosWorkshops.set(data),
    });
  }

  adicionar(workshopId: number): void {
    this.workshopService.postColaboradorToWorkshop(workshopId, this.colaboradorId()).subscribe({
      next: () => this.carregarDados(),
      error: () => this.error.set('Erro ao adicionar workshop.'),
    });
  }

  remover(workshopId: number): void {
    this.workshopService.deleteColaboradorFromWorkshop(workshopId, this.colaboradorId()).subscribe({
      next: () => this.carregarDados(),
      error: () => this.error.set('Erro ao remover workshop.'),
    });
  }
}
