import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import {
  LmAccordionItemComponent,
  LmAccordionGroupComponent,
  LmAccordionTriggerDirective,
  LmAccordionTitleDirective,
  LmAccordionIconDirective,
  LmAccordionContentDirective,
} from '@lumaui/angular';

@Component({
  selector: 'app-accordion-previews',
  imports: [
    LmAccordionItemComponent,
    LmAccordionGroupComponent,
    LmAccordionTriggerDirective,
    LmAccordionTitleDirective,
    LmAccordionIconDirective,
    LmAccordionContentDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './accordion-previews.component.html',
})
export class AccordionPreviewsComponent {
  exampleId = input.required<string>();

  // State for Controlled Group
  singleValue = signal<string>('item-1');
}
