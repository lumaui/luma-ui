import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'docs',
    children: [
      {
        path: '',
        redirectTo: 'getting-started',
        pathMatch: 'full',
      },
      {
        path: 'getting-started',
        loadComponent: () =>
          import(
            './pages/getting-started-page/getting-started-page.component'
          ).then((m) => m.GettingStartedPageComponent),
      },
      {
        path: 'components',
        loadComponent: () =>
          import('./pages/docs-overview/docs-overview.component').then(
            (m) => m.DocsOverviewComponent,
          ),
      },
      {
        path: 'theme/:slug',
        loadComponent: () =>
          import('./pages/theme-docs/theme-docs.component').then(
            (m) => m.ThemeDocsComponent,
          ),
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
