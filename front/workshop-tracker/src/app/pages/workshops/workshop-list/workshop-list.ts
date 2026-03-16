import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopService } from '../../../core/services/workshop.service';
import { Workshop } from '../../../models/workshop.model';

@Component({
  selector: 'app-workshops',
  imports: [CommonModule],
  templateUrl: './workshop-list.html',
  styleUrl: './workshop-list.css',
})

export class Workshops implements OnInit {
  workshops = signal<Workshop[]>([]);
  loading = signal(true);
  error = signal('');

  constructor(private workshopService: WorkshopService) {}

  ngOnInit(): void {
    this.workshopService.getAll().subscribe({
      next: (data) => {
        this.workshops.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Erro ao carregar workshops.');
        this.loading.set(false);
        console.error(err);
      },
    });
  }
}
