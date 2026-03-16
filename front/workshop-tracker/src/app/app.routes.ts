import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'workshops',
    pathMatch: 'full',
  } ,
  {
    path: 'colaboradores',
    loadComponent: () =>
      import('./pages/colaboradores/colaboradores').then((m) => m.Colaboradores),
  },
  {
    path: 'workshops',
    loadComponent: () =>
      import('./pages/workshops/workshop-list/workshop-list').then(
        (m) => m.Workshops,
      ),
  },
  {
    path: 'workshops/:id',
    loadComponent: () =>
      import('./pages/workshops/workshop-details/workshop-details').then(
        (m) => m.WorkshopDetails,
      ),
  },
];
