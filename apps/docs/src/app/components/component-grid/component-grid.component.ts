import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  LmBadgeDirective,
  LmButtonDirective,
  LmCardComponent,
  LmCardHeaderDirective,
  LmCardTitleDirective,
  LmCardDescriptionDirective,
  LmCardContentDirective,
  LmAccordionItemComponent,
  LmAccordionTriggerDirective,
  LmAccordionTitleDirective,
  LmAccordionIconDirective,
  LmAccordionContentDirective,
  LmTooltipDirective,
  LmTabsComponent,
  LmTabsListDirective,
  LmTabsTriggerDirective,
  LmTabsPanelDirective,
} from '@lumaui/angular';

interface ComponentCard {
  id: string;
  name: string;
  description: string;
  category: string;
  route: string;
  size: 'small' | 'medium' | 'large' | 'full';
}

@Component({
  selector: 'app-component-grid',
  standalone: true,
  imports: [
    RouterModule,
    LmBadgeDirective,
    LmButtonDirective,
    LmCardComponent,
    LmCardHeaderDirective,
    LmCardTitleDirective,
    LmCardDescriptionDirective,
    LmCardContentDirective,
    LmAccordionItemComponent,
    LmAccordionTriggerDirective,
    LmAccordionTitleDirective,
    LmAccordionIconDirective,
    LmAccordionContentDirective,
    LmTooltipDirective,
    LmTabsComponent,
    LmTabsListDirective,
    LmTabsTriggerDirective,
    LmTabsPanelDirective,
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
      size: 'small',
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
    {
      id: 'badge',
      name: 'Badge',
      description:
        'Compact labels for status, categories, or counts with customizable colors',
      category: 'Layout',
      route: '/docs/badge',
      size: 'small',
    },
    {
      id: 'tooltip',
      name: 'Tooltip',
      description:
        'Modern arrow-less tooltips with auto-positioning and mobile support',
      category: 'Feedback',
      route: '/docs/tooltip',
      size: 'small',
    },
    {
      id: 'tabs',
      name: 'Tabs',
      description:
        'Tabbed interface for organizing content with keyboard navigation and lazy loading',
      category: 'Layout',
      route: '/docs/tabs',
      size: 'full',
    },
    {
      id: 'modal',
      name: 'Modal',
      description:
        'HTML-first modal dialog with focus trap, accessibility, and smooth animations',
      category: 'Feedback',
      route: '/docs/modal',
      size: 'medium',
    },
  ];

  getCardClasses(size: string): string {
    const baseClasses = '';
    switch (size) {
      case 'full':
        return `${baseClasses} lg:col-span-3`;
      case 'large':
        return `${baseClasses} lg:col-span-2`;
      case 'medium':
        return `${baseClasses} lg:row-span-2`;
      default:
        return baseClasses;
    }
  }
}
