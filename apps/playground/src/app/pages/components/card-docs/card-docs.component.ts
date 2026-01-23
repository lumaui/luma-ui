import { Component } from '@angular/core';
import { ComponentDetailComponent } from '../component-detail/component-detail.component';
import { CodePreviewComponent } from '../../../components/code-preview/code-preview.component';
import { CardComponent, CardHeaderDirective, CardTitleDirective, CardDescriptionDirective, CardContentDirective } from '@luma/components';

interface DesignToken {
  name: string;
  value: string;
  description: string;
}

interface APIDirective {
  name: string;
  selector: string;
  description: string;
  inputs?: { name: string; type: string; default: string }[];
}

@Component({
  selector: 'app-card-docs',
  standalone: true,
  imports: [
    ComponentDetailComponent,
    CodePreviewComponent,
    CardComponent,
    CardHeaderDirective,
    CardTitleDirective,
    CardDescriptionDirective,
    CardContentDirective,
  ],
  templateUrl: './card-docs.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class CardDocsComponent {
  examples = {
    basic: `<luma-card>
  <div lumaCardHeader>
    <h3 lumaCardTitle>Card Title</h3>
    <p lumaCardDescription>Card description goes here</p>
  </div>
  <div lumaCardContent>
    <p>This is the content area of the card.</p>
  </div>
</luma-card>`,
    stats: `<luma-card>
  <div lumaCardHeader>
    <h3 lumaCardTitle>Total Users</h3>
    <p lumaCardDescription>Last 30 days</p>
  </div>
  <div lumaCardContent>
    <div class="flex items-end justify-between">
      <span class="text-3xl font-semibold">1,284</span>
      <span class="text-xs px-2.5 py-1 rounded-full bg-badge-bg text-badge">+12%</span>
    </div>
  </div>
</luma-card>`,
    sizes: `<luma-card>
  <div lumaCardHeader>
    <h3 lumaCardTitle size="small">Small</h3>
    <p lumaCardDescription size="small">Small text</p>
  </div>
</luma-card>

<luma-card>
  <div lumaCardHeader>
    <h3 lumaCardTitle>Normal</h3>
    <p lumaCardDescription>Normal text</p>
  </div>
</luma-card>

<luma-card>
  <div lumaCardHeader>
    <h3 lumaCardTitle size="large">Large</h3>
    <p lumaCardDescription size="large">Large text</p>
  </div>
</luma-card>`,
    grid: `<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <luma-card>
    <div lumaCardHeader>
      <h3 lumaCardTitle size="small">Revenue</h3>
      <p lumaCardDescription size="small">Monthly</p>
    </div>
    <div lumaCardContent>
      <span class="text-2xl font-semibold">$12.5k</span>
    </div>
  </luma-card>
  <!-- More cards... -->
</div>`,
  };

  tokens: DesignToken[] = [
    {
      name: '--luma-card-background',
      value: 'oklch(0.99 0 0)',
      description: 'Card background color',
    },
    {
      name: '--luma-card-gradient-from',
      value: 'oklch(0.92 0.005 0 / 0.6)',
      description: 'Gradient border start color',
    },
    {
      name: '--luma-card-gradient-to',
      value: 'oklch(0.96 0.003 0 / 0.6)',
      description: 'Gradient border end color',
    },
    {
      name: '--luma-radius-lg',
      value: '18px',
      description: 'Card border radius',
    },
    {
      name: '--luma-card-padding',
      value: '1.5rem',
      description: 'Card internal padding',
    },
  ];

  directives: APIDirective[] = [
    {
      name: 'lumaCardHeader',
      selector: '[lumaCardHeader]',
      description: 'Container for card header content (title and description)',
    },
    {
      name: 'lumaCardTitle',
      selector: '[lumaCardTitle]',
      description: 'Card title with customizable size',
      inputs: [
        {
          name: 'size',
          type: "'small' | 'normal' | 'large'",
          default: "'normal'",
        },
      ],
    },
    {
      name: 'lumaCardDescription',
      selector: '[lumaCardDescription]',
      description: 'Card description text with customizable size',
      inputs: [
        {
          name: 'size',
          type: "'small' | 'normal' | 'large'",
          default: "'normal'",
        },
      ],
    },
    {
      name: 'lumaCardContent',
      selector: '[lumaCardContent]',
      description: 'Container for card main content',
    },
  ];
}
