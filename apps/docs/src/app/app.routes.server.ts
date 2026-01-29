import { RenderMode, ServerRoute } from '@angular/ssr';
import registryData from '../generated/docs-registry.json';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'docs',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'docs/getting-started',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'docs/components',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'docs/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      // Return all component slugs from the registry for prerendering
      return registryData.components.map((comp) => ({ slug: comp.slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
