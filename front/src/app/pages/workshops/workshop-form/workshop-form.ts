import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { WorkshopService } from '../../../core/services/workshop.service';
import { Workshop } from '../../../models/workshop.model';

@Component({
  selector: 'app-workshop-form',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './workshop-form.html',
  styleUrl: './workshop-form.css',
})
export class WorkshopForm implements OnInit {
  nome = signal('');
  descricao = signal('');
  dataRealizacao = signal('');
  isEditing = signal(false);
  workshopId = signal<number | null>(null);
  loading = signal(false);
  error = signal('');

  constructor(
    private workshopService: WorkshopService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditing.set(true);
      this.workshopId.set(Number(id));

      this.workshopService.getById(Number(id)).subscribe({
        next: (data) => {
          this.nome.set(data.nome);
          this.descricao.set(data.descricao);
          this.dataRealizacao.set(data.dataRealizacao.substring(0, 10));
        },
        error: () => this.error.set('Erro ao carregar workshop.'),
      });
    }
  }

  save(): void {
    if (!this.nome()) return;

    const workshop: Partial<Workshop> = {
      nome: this.nome(),
      descricao: this.descricao(),
      dataRealizacao: this.dataRealizacao()
    };

    if (this.isEditing() && this.workshopId()) {
      this.workshopService.update(this.workshopId()!, workshop as Workshop).subscribe({
        next: () => this.router.navigate(['/workshops']),
        error: () => this.error.set('Erro ao atualizar workshop.'),
      });
    } else {
      this.workshopService.create(workshop as Workshop).subscribe({
        next: () => this.router.navigate(['/workshops']),
        error: () => this.error.set('Erro ao criar workshop.'),
      });
    }
  }

  delete(): void {
    if (!this.workshopId()) return;

    this.workshopService.delete(this.workshopId()!).subscribe({
      next: () => this.router.navigate(['/workshops']),
      error: () => this.error.set('Erro ao deletar workshop.'),
    });
  }
}
