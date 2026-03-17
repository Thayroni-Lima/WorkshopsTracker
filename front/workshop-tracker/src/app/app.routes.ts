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
      import('./pages/colaboradores/colaborador-form/colaborador-form')
        .then(m => m.ColaboradorForm)
  },
  {
    path: 'colaboradores/:id/edit',
    loadComponent: () =>
      import('./pages/colaboradores/colaborador-form/colaborador-form')
        .then(m => m.ColaboradorForm)
  },
  {
    path: 'colaboradores/:id/workshops',
    loadComponent: () =>
      import('./pages/colaboradores/colaborador-workshops/colaborador-workshops')
        .then(m => m.ColaboradorWorkshops)
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
    path: 'workshops/:id',
    loadComponent: () =>
      import('./pages/workshops/workshop-details/workshop-details').then((m) => m.WorkshopDetails),
  },
];
