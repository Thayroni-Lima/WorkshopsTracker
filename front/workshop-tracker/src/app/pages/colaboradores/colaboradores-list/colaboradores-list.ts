import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColaboradorService } from '../../../core/services/colaborador.service';
import { Colaborador } from '../../../models/colaborador.model';

@Component({
  selector: 'app-colaboradores',
  imports: [CommonModule],
  templateUrl: './colaboradores-list.html',
  styleUrl: './colaboradores-list.css',
})

export class Colaboradores implements OnInit {
  colaboradores = signal<Colaborador[]>([]);
  loading = signal(true);
  error = signal('');

  constructor(private colaboradorService: ColaboradorService) {}

  ngOnInit(): void {
    this.colaboradorService.getAll().subscribe({
      next: (data) => {
        this.colaboradores.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Erro ao carregar colaboradores.');
        this.loading.set(false);
        console.error(err);
      },
    });
  }
}
