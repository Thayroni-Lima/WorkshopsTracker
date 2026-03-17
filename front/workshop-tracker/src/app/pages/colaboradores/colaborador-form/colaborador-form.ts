import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ColaboradorService } from '../../../core/services/colaborador.service';
import { Colaborador } from '../../../models/colaborador.model';

@Component({
  selector: 'app-colaborador-form',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './colaborador-form.html',
  styleUrl: './colaborador-form.css',
})
export class ColaboradorForm implements OnInit {
  nome = signal('');
  isEditing = signal(false);
  colaboradorId = signal<number | null>(null);
  loading = signal(false);
  error = signal('');

  constructor(
    private colaboradorService: ColaboradorService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditing.set(true);
      this.colaboradorId.set(Number(id));

      this.colaboradorService.getById(Number(id)).subscribe({
        next: (data) => this.nome.set(data.nome),
        error: () => this.error.set('Erro ao carregar colaborador.'),
      });
    }
  }

  save(): void {
    if (!this.nome()) return;

    const colaborador: Partial<Colaborador> = { nome: this.nome() };

    if (this.isEditing() && this.colaboradorId()) {
      this.colaboradorService.update(this.colaboradorId()!, colaborador as Colaborador).subscribe({
        next: () => this.router.navigate(['/colaboradores']),
        error: () => this.error.set('Erro ao atualizar colaborador.'),
      });
    } else {
      this.colaboradorService.create(colaborador as Colaborador).subscribe({
        next: () => this.router.navigate(['/colaboradores']),
        error: () => this.error.set('Erro ao criar colaborador.'),
      });
    }
  }

  delete(): void {
    if (!this.colaboradorId()) return;

    this.colaboradorService.delete(this.colaboradorId()!).subscribe({
      next: () => this.router.navigate(['/colaboradores']),
      error: () => this.error.set('Erro ao deletar colaborador.'),
    });
  }
}
