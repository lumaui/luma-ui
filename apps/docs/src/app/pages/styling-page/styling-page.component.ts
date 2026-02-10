import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import {
  ColorGridComponent,
  type ColorSwatch,
} from '../../components/color-grid/color-grid.component';
import {
  TokenPreviewComponent,
  type TokenPreviewData,
} from '../../components/token-preview/token-preview.component';

@Component({
  selector: 'app-styling-page',
  imports: [
    RouterLink,
    SidebarComponent,
    ColorGridComponent,
    TokenPreviewComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './styling-page.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class StylingPageComponent {
  /**
   * Primary color scale (12 steps)
   */
  readonly primaryColors: ColorSwatch[] = [
    { step: 1, value: 'oklch(1 0 300)', description: 'Subtle backgrounds' },
    { step: 2, value: 'oklch(0.94 0.020 300)', description: 'Hover states' },
    {
      step: 3,
      value: 'oklch(0.88 0.035 300)',
      description: 'Secondary backgrounds',
    },
    {
      step: 4,
      value: 'oklch(0.78 0.060 300)',
      description: 'Interactive elements',
    },
    {
      step: 5,
      value: 'oklch(0.48 0.090 300)',
      description: 'BASE COLOR - buttons',
    },
    {
      step: 6,
      value: 'oklch(0.43 0.085 300)',
      description: 'Button hover',
    },
    { step: 7, value: 'oklch(0.38 0.080 300)', description: 'Borders' },
    { step: 8, value: 'oklch(0.33 0.075 300)', description: 'Active borders' },
    {
      step: 9,
      value: 'oklch(0.28 0.065 300)',
      description: 'Pressed states',
    },
    { step: 10, value: 'oklch(0.23 0.055 300)', description: 'High emphasis' },
    {
      step: 11,
      value: 'oklch(0.18 0.045 300)',
      description: 'High-contrast text',
    },
    { step: 12, value: 'oklch(0.13 0.030 300)', description: 'Text, links' },
  ];

  /**
   * Gray scale (12 steps)
   */
  readonly grayColors: ColorSwatch[] = [
    {
      step: 1,
      value: 'oklch(0.99 0.000 0)',
      description: 'Subtle backgrounds',
    },
    {
      step: 2,
      value: 'oklch(0.98 0.000 0)',
      description: 'Card backgrounds',
    },
    {
      step: 3,
      value: 'oklch(0.95 0.000 0)',
      description: 'Primary border color',
    },
    {
      step: 4,
      value: 'oklch(0.92 0.000 0)',
      description: 'Hover backgrounds',
    },
    {
      step: 5,
      value: 'oklch(0.89 0.000 0)',
      description: 'Active backgrounds',
    },
    { step: 6, value: 'oklch(0.86 0.000 0)', description: 'Subtle dividers' },
    {
      step: 7,
      value: 'oklch(0.82 0.000 0)',
      description: 'Prominent dividers',
    },
    {
      step: 8,
      value: 'oklch(0.76 0.000 0)',
      description: 'Solid backgrounds',
    },
    { step: 9, value: 'oklch(0.60 0.000 0)', description: 'Secondary text' },
    {
      step: 10,
      value: 'oklch(0.57 0.000 0)',
      description: 'Secondary text hover',
    },
    { step: 11, value: 'oklch(0.45 0.000 0)', description: 'Tertiary text' },
    { step: 12, value: 'oklch(0.20 0.000 0)', description: 'Primary text' },
  ];

  /**
   * Surface colors
   */
  readonly surfaceColors: ColorSwatch[] = [
    {
      step: 1,
      value: 'oklch(1 0 0)',
      description: 'App background (white)',
    },
    {
      step: 2,
      value: 'oklch(0.22 0.014 290)',
      description: 'Primary text color',
    },
    {
      step: 3,
      value: 'oklch(0.13 0.030 300)',
      description: 'Popover background',
    },
    {
      step: 4,
      value: 'oklch(1 0 0)',
      description: 'Popover text',
    },
  ];

  /**
   * Semantic state colors
   */
  readonly semanticColors: ColorSwatch[] = [
    {
      step: 1,
      value: 'oklch(0.63 0.10 28)',
      description: 'Destructive - errors',
    },
    {
      step: 2,
      value: 'oklch(1 0 0)',
      description: 'Destructive text',
    },
    {
      step: 3,
      value: 'oklch(0.80 0.09 95)',
      description: 'Warning - caution',
    },
    {
      step: 4,
      value: 'oklch(0.22 0.014 290)',
      description: 'Warning text',
    },
    {
      step: 5,
      value: 'oklch(0.72 0.07 155)',
      description: 'Success - confirmations',
    },
    {
      step: 6,
      value: 'oklch(1 0 0)',
      description: 'Success text',
    },
  ];

  /**
   * Border radius tokens with visual previews
   */
  readonly radiusTokens: TokenPreviewData[] = [
    {
      name: 'Radius 1',
      description: 'Minimal (2px)',
      value: '0.125rem',
      category: 'radius',
      cssExample: `.element {\n  border-radius: var(--radius-1);\n}`,
    },
    {
      name: 'Radius 2',
      description: 'Small (4px) - badges, pills',
      value: '0.25rem',
      category: 'radius',
      cssExample: `.badge {\n  border-radius: var(--radius-2);\n}`,
    },
    {
      name: 'Radius 3',
      description: 'Medium-small (6px) - tooltips',
      value: '0.375rem',
      category: 'radius',
      cssExample: `.tooltip {\n  border-radius: var(--radius-3);\n}`,
    },
    {
      name: 'Radius 4',
      description: 'Medium (8px) - buttons, inputs',
      value: '0.5rem',
      category: 'radius',
      cssExample: `.button {\n  border-radius: var(--radius-4);\n}`,
    },
    {
      name: 'Radius 5',
      description: 'Large (12px) - cards',
      value: '0.75rem',
      category: 'radius',
      cssExample: `.card {\n  border-radius: var(--radius-5);\n}`,
    },
    {
      name: 'Radius 6',
      description: 'Extra large (16px) - modals',
      value: '1rem',
      category: 'radius',
      cssExample: `.modal {\n  border-radius: var(--radius-6);\n}`,
    },
  ];

  /**
   * Shadow tokens with visual previews
   */
  readonly shadowTokens: TokenPreviewData[] = [
    {
      name: 'Shadow 1',
      description: 'Subtle inset - input fields',
      value: 'inset 0 0 0 1px oklch(0.5 0 0 / 0.03)',
      category: 'shadow',
      cssExample: `.input {\n  box-shadow: var(--shadow-1);\n}`,
    },
    {
      name: 'Shadow 2',
      description: 'Minimal elevation - default cards',
      value: '0 1px 2px 0 oklch(0 0 0 / 0.03), 0 0 0 1px oklch(0.5 0 0 / 0.02)',
      category: 'shadow',
      cssExample: `.card {\n  box-shadow: var(--shadow-2);\n}`,
    },
    {
      name: 'Shadow 3',
      description: 'Low elevation - elevated cards',
      value: '0 2px 4px 0 oklch(0 0 0 / 0.04), 0 0 0 1px oklch(0.5 0 0 / 0.02)',
      category: 'shadow',
      cssExample: `.card:hover {\n  box-shadow: var(--shadow-3);\n}`,
    },
    {
      name: 'Shadow 4',
      description: 'Medium elevation - toasts, dropdowns',
      value: '0 4px 8px 0 oklch(0 0 0 / 0.06), 0 0 0 1px oklch(0.5 0 0 / 0.02)',
      category: 'shadow',
      cssExample: `.toast {\n  box-shadow: var(--shadow-4);\n}`,
    },
    {
      name: 'Shadow 5',
      description: 'High elevation - popovers',
      value:
        '0 8px 16px 0 oklch(0 0 0 / 0.08), 0 0 0 1px oklch(0.5 0 0 / 0.02)',
      category: 'shadow',
      cssExample: `.popover {\n  box-shadow: var(--shadow-5);\n}`,
    },
    {
      name: 'Shadow 6',
      description: 'Maximum elevation - modals',
      value:
        '0 16px 32px 0 oklch(0 0 0 / 0.10), 0 0 0 1px oklch(0.5 0 0 / 0.02)',
      category: 'shadow',
      cssExample: `.modal {\n  box-shadow: var(--shadow-6);\n}`,
    },
  ];
}
