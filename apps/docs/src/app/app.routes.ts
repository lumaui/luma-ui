import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'components',
    children: [
      {
        path: '',
        redirectTo: '/components/button',
        pathMatch: 'full',
      },
      {
        path: ':slug',
        loadComponent: () =>
          import('./pages/component-docs/component-docs.component').then(
            (m) => m.ComponentDocsComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
