import { Component } from '@angular/core';
import { ComponentDetailComponent } from '../component-detail/component-detail.component';
import { CodePreviewComponent } from '../../../components/code-preview/code-preview.component';
import { ButtonDirective } from '../../../../../../../packages/components/src';

interface DesignToken {
  name: string;
  value: string;
  description: string;
}

interface APIProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'app-button-docs',
  standalone: true,
  imports: [ComponentDetailComponent, CodePreviewComponent, ButtonDirective],
  templateUrl: './button-docs.component.html',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ButtonDocsComponent {
  examples = {
    variants: `<!-- All button variants -->
<button lumaButton variant="primary">Primary</button>
<button lumaButton variant="outline">Outline</button>
<button lumaButton variant="ghost">Ghost</button>
<button lumaButton variant="danger">Danger</button>`,
    sizes: `<!-- All button sizes -->
<button lumaButton size="sm">Small</button>
<button lumaButton size="md">Medium</button>
<button lumaButton size="lg">Large</button>`,
    disabled: `<!-- Disabled state -->
<button lumaButton variant="primary" [disabled]="true">Disabled Primary</button>
<button lumaButton variant="outline" [disabled]="true">Disabled Outline</button>`,
    fullWidth: `<!-- Full width button -->
<button lumaButton size="full">Full Width Button</button>`,
    group: `<!-- Button group -->
<div class="flex gap-4">
  <button lumaButton variant="primary">Save</button>
  <button lumaButton variant="outline">Cancel</button>
  <button lumaButton variant="danger">Delete</button>
</div>`,
    grid: `<!-- All combinations -->
<div class="grid grid-cols-3 gap-4">
  <button lumaButton variant="primary" size="sm">Primary SM</button>
  <button lumaButton variant="primary" size="md">Primary MD</button>
  <button lumaButton variant="primary" size="lg">Primary LG</button>
  <button lumaButton variant="outline" size="sm">Outline SM</button>
  <button lumaButton variant="outline" size="md">Outline MD</button>
  <button lumaButton variant="outline" size="lg">Outline LG</button>
  <button lumaButton variant="ghost" size="sm">Ghost SM</button>
  <button lumaButton variant="ghost" size="md">Ghost MD</button>
  <button lumaButton variant="ghost" size="lg">Ghost LG</button>
  <button lumaButton variant="danger" size="sm">Danger SM</button>
  <button lumaButton variant="danger" size="md">Danger MD</button>
  <button lumaButton variant="danger" size="lg">Danger LG</button>
</div>`
  };

  tokens: DesignToken[] = [
    // Primary variant
    { name: '--luma-button-primary-bg', value: 'oklch(0.54 0.1 230)', description: 'Primary button background' },
    { name: '--luma-button-primary-bg-hover', value: 'oklch(0.49 0.09 230)', description: 'Primary button hover background' },
    { name: '--luma-button-primary-bg-active', value: 'oklch(0.44 0.08 230)', description: 'Primary button active background' },
    { name: '--luma-button-primary-text', value: 'oklch(1 0 0)', description: 'Primary button text color' },
    // Outline variant
    { name: '--luma-button-outline-border', value: 'oklch(0.5 0.01 0)', description: 'Outline button border color' },
    { name: '--luma-button-outline-border-hover', value: 'oklch(0.2 0.005 0)', description: 'Outline button hover border' },
    { name: '--luma-button-outline-bg-hover', value: 'oklch(0.96 0.01 230)', description: 'Outline button hover background' },
    { name: '--luma-button-outline-text', value: 'oklch(0.2 0.005 0)', description: 'Outline button text color' },
    // Ghost variant
    { name: '--luma-button-ghost-bg', value: 'transparent', description: 'Ghost button background' },
    { name: '--luma-button-ghost-bg-hover', value: 'oklch(0.96 0.01 230)', description: 'Ghost button hover background' },
    { name: '--luma-button-ghost-text', value: 'oklch(0.2 0.005 0)', description: 'Ghost button text color' },
    // Danger variant
    { name: '--luma-button-danger-bg', value: 'oklch(0.55 0.22 25)', description: 'Danger button background' },
    { name: '--luma-button-danger-bg-hover', value: 'oklch(0.50 0.20 25)', description: 'Danger button hover background' },
    { name: '--luma-button-danger-bg-active', value: 'oklch(0.45 0.18 25)', description: 'Danger button active background' },
    { name: '--luma-button-danger-text', value: 'oklch(1 0 0)', description: 'Danger button text color' },
    // Spacing
    { name: '--luma-button-padding-x-sm', value: '1rem', description: 'Small button horizontal padding' },
    { name: '--luma-button-padding-x-md', value: '1.5rem', description: 'Medium button horizontal padding' },
    { name: '--luma-button-padding-x-lg', value: '2rem', description: 'Large button horizontal padding' },
    { name: '--luma-button-padding-y-sm', value: '0.5rem', description: 'Small button vertical padding' },
    { name: '--luma-button-padding-y-md', value: '0.75rem', description: 'Medium button vertical padding' },
    { name: '--luma-button-padding-y-lg', value: '1rem', description: 'Large button vertical padding' },
    // Other
    { name: '--luma-button-radius', value: '10px', description: 'Button border radius' },
    { name: '--luma-button-transition-duration', value: '200ms', description: 'Transition duration' },
    { name: '--luma-button-focus-ring-width', value: '2px', description: 'Focus ring width' },
    { name: '--luma-button-focus-ring-color', value: 'oklch(0.54 0.1 230 / 0.25)', description: 'Focus ring color' }
  ];

  apiProperties: APIProperty[] = [
    {
      name: 'variant',
      type: "'primary' | 'outline' | 'ghost' | 'danger'",
      default: "'primary'",
      description: 'Visual style variant of the button'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg' | 'full'",
      default: "'md'",
      description: 'Size of the button'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the button is disabled'
    },
    {
      name: 'type',
      type: "'button' | 'submit' | 'reset'",
      default: "'button'",
      description: 'HTML button type attribute'
    }
  ];
}
