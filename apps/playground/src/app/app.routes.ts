import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'components',
    children: [
      {
        path: '',
        redirectTo: '/components/button',
        pathMatch: 'full'
      },
      {
        path: 'button',
        loadComponent: () => import('./pages/components/button-docs/button-docs.component').then(m => m.ButtonDocsComponent)
      },
      {
        path: 'card',
        loadComponent: () => import('./pages/components/card-docs/card-docs.component').then(m => m.CardDocsComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
