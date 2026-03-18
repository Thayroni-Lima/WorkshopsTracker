import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import { WorkshopService } from '../../core/services/workshop.service';
import { ColaboradorService } from '../../core/services/colaborador.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  loading = signal(true);

  barChartData = signal<ChartData<'bar'>>({ labels: [], datasets: [] });
  pieChartData = signal<ChartData<'pie'>>({ labels: [], datasets: [] });

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: { legend: { display: false } },
  };

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };

  constructor(
    private workshopService: WorkshopService,
    private colaboradorService: ColaboradorService,
  ) {}

  ngOnInit(): void {
    this.workshopService.getAll().subscribe((workshops) => {
      // Gráfico de pizza — colaboradores por workshop
      this.pieChartData.set({
        labels: workshops.map((w) => w.nome),
        datasets: [
          {
            data: workshops.map((w) => w.colaboradores.length),
          },
        ],
      });

      // Gráfico de barras — workshops por colaborador
      const colaboradoresMap = new Map<string, number>();
      workshops.forEach((w) => {
        w.colaboradores.forEach((c) => {
          colaboradoresMap.set(c.nome, (colaboradoresMap.get(c.nome) || 0) + 1);
        });
      });

      this.barChartData.set({
        labels: Array.from(colaboradoresMap.keys()),
        datasets: [
          {
            label: 'Workshops participados',
            data: Array.from(colaboradoresMap.values()),
          },
        ],
      });

      this.loading.set(false);
    });
  }
}
