import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ButtonDirective,
  CardComponent,
  CardHeaderDirective,
  CardTitleDirective,
  CardDescriptionDirective,
  CardContentDirective,
  AccordionItemComponent,
  AccordionTriggerDirective,
  AccordionTitleDirective,
  AccordionIconDirective,
  AccordionContentDirective,
} from '@lumaui/angular';

interface ComponentCard {
  id: string;
  name: string;
  description: string;
  category: string;
  route: string;
  size: 'small' | 'medium' | 'large';
}

@Component({
  selector: 'app-component-grid',
  standalone: true,
  imports: [
    RouterModule,
    ButtonDirective,
    CardComponent,
    CardHeaderDirective,
    CardTitleDirective,
    CardDescriptionDirective,
    CardContentDirective,
    AccordionItemComponent,
    AccordionTriggerDirective,
    AccordionTitleDirective,
    AccordionIconDirective,
    AccordionContentDirective,
  ],
  templateUrl: './component-grid.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class ComponentGridComponent {
  components: ComponentCard[] = [
    {
      id: 'button',
      name: 'Button',
      description:
        'Primary, secondary variants with full customization and accessibility',
      category: 'Form',
      route: '/docs/button',
      size: 'large',
    },
    {
      id: 'card',
      name: 'Card',
      description:
        'Elevated cards with gradient borders and flexible content areas',
      category: 'Layout',
      route: '/docs/card',
      size: 'medium',
    },
    {
      id: 'accordion',
      name: 'Accordion',
      description:
        'Expandable content sections with smooth animations and accessibility',
      category: 'Layout',
      route: '/docs/accordion',
      size: 'medium',
    },
  ];

  getCardClasses(size: string): string {
    const baseClasses = '';
    switch (size) {
      case 'large':
        return `${baseClasses} lg:col-span-2`;
      case 'medium':
        return `${baseClasses} lg:row-span-2`;
      default:
        return baseClasses;
    }
  }
}
