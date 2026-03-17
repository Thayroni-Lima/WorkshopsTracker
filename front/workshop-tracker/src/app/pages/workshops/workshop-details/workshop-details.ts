import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { WorkshopService } from '../../../core/services/workshop.service';
import { Workshop } from '../../../models/workshop.model';

@Component({
  selector: 'app-workshop-details',
  imports: [CommonModule],
  templateUrl: './workshop-details.html',
  styleUrl: './workshop-details.css',
})
export class WorkshopDetails implements OnInit {
  workshop = signal<Workshop | null>(null);
  loading = signal(true);
  error = signal('');

  constructor(
    private workshopService: WorkshopService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.workshopService.getById(id).subscribe({
      next: (data) => {
        this.workshop.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Erro ao carregar workshop.');
        this.loading.set(false);
        console.error(err);
      },
    });
  }
}
