import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WorkshopService } from '../../../core/services/workshop.service';
import { Colaborador } from '../../../models/colaborador.model';

@Component({
  selector: 'app-workshop-colaboradores',
  imports: [CommonModule, RouterLink],
  templateUrl: './workshop-colaboradores.html',
  styleUrl: './workshop-colaboradores.css',
})
export class WorkshopColaboradores implements OnInit {
  colaboradores = signal<Colaborador[]>([]);
  loading = signal(true);
  error = signal('');

  constructor(
    private workshopService: WorkshopService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.workshopService.getColaboradoresByWorkshopId(id).subscribe({
      next: (data) => {
        this.colaboradores.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Erro ao carregar colaboradores do workshop.');
        this.loading.set(false);
        console.error(err);
      },
    });
  }
}
