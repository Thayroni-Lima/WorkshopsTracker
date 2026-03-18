import { Routes } from '@angular/router';

export const routes: Routes = [
  // Rotas para colaboradores
  {
    path: 'colaboradores',
    loadComponent: () =>
      import('./pages/colaboradores/colaboradores-list/colaboradores-list').then(
        (m) => m.Colaboradores,
      ),
  },
  {
    path: 'colaboradores/new',
    loadComponent: () =>
      import('./pages/colaboradores/colaborador-form/colaborador-form').then(
        (m) => m.ColaboradorForm,
      ),
  },
  {
    path: 'colaboradores/:id/edit',
    loadComponent: () =>
      import('./pages/colaboradores/colaborador-form/colaborador-form').then(
        (m) => m.ColaboradorForm,
      ),
  },
  {
    path: 'colaboradores/:id/workshops',
    loadComponent: () =>
      import('./pages/colaboradores/colaborador-workshops/colaborador-workshops').then(
        (m) => m.ColaboradorWorkshops,
      ),
  },

  // Rotas para workshops
  {
    path: '',
    redirectTo: 'workshops',
    pathMatch: 'full',
  },
  {
    path: 'workshops',
    loadComponent: () =>
      import('./pages/workshops/workshop-list/workshop-list').then((m) => m.Workshops),
  },
  {
    path: 'workshops/new',
    loadComponent: () =>
      import('./pages/workshops/workshop-form/workshop-form').then((m) => m.WorkshopForm),
  },
  {
    path: 'workshops/:id/edit',
    loadComponent: () =>
      import('./pages/workshops/workshop-form/workshop-form').then((m) => m.WorkshopForm),
  },
  {
    path: 'workshops/:id/colaboradores',
    loadComponent: () =>
      import('./pages/workshops/workshop-colaboradores/workshop-colaboradores').then(
        (m) => m.WorkshopColaboradores,
      ),
  },

  // Rota para dashboard
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
  },
];
