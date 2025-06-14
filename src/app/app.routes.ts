import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./details/details.component').then((m) => m.DetailsComponent),
  },
  {
    path: 'list-recipe',
    loadComponent: () => import('./table-view/table-view.component').then((m) => m.TableViewComponent),
  },
  { path: '**', redirectTo: '' }, // Wildcard route
];

