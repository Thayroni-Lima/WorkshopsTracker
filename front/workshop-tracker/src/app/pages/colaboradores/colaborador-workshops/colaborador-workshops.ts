import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ColaboradorService } from '../../../core/services/colaborador.service';
import { Workshop } from '../../../models/workshop.model';

@Component({
  selector: 'app-colaborador-workshops',
  imports: [CommonModule, RouterLink],
  templateUrl: './colaborador-workshops.html',
  styleUrl: './colaborador-workshops.css',
})
export class ColaboradorWorkshops implements OnInit {
  workshops = signal<Workshop[]>([]);
  loading = signal(true);
  error = signal('');

  constructor(
    private colaboradorService: ColaboradorService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.colaboradorService.getWorkshopsByColaboradorId(id).subscribe({
      next: (data) => {
        this.workshops.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Erro ao carregar workshops do colaborador.');
        this.loading.set(false);
        console.error(err);
      },
    });
  }
}
