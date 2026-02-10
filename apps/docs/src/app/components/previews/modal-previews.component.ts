import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import {
  LmButtonDirective,
  LmModalComponent,
  LmModalOverlayComponent,
  LmModalContainerComponent,
  LmModalHeaderDirective,
  LmModalTitleDirective,
  LmModalContentDirective,
  LmModalFooterDirective,
  LmModalCloseComponent,
} from '@lumaui/angular';

@Component({
  selector: 'app-modal-previews',
  imports: [
    UpperCasePipe,
    LmButtonDirective,
    LmModalComponent,
    LmModalOverlayComponent,
    LmModalContainerComponent,
    LmModalHeaderDirective,
    LmModalTitleDirective,
    LmModalContentDirective,
    LmModalFooterDirective,
    LmModalCloseComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal-previews.component.html',
})
export class ModalPreviewsComponent {
  exampleId = input.required<string>();

  // Basic Modal state
  basicOpen = signal(false);

  // Different Sizes state
  sizes = ['sm', 'md', 'lg', 'xl', 'full'] as const;
  sizeOpen = signal(false);
  currentSize = signal<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');

  openSize(size: 'sm' | 'md' | 'lg' | 'xl' | 'full') {
    this.currentSize.set(size);
    this.sizeOpen.set(true);
  }

  // Scrollable Content state
  scrollOpen = signal(false);
  scrollSections = [1, 2, 3, 4, 5, 6, 7, 8];

  // Uncontrolled Mode state
  uncontrolledOpen = signal(false);

  // Footer Alignment state
  alignments = ['start', 'center', 'end', 'between'] as const;
  alignOpen = signal(false);
  currentAlign = signal<'start' | 'center' | 'end' | 'between'>('end');

  openAlign(align: 'start' | 'center' | 'end' | 'between') {
    this.currentAlign.set(align);
    this.alignOpen.set(true);
  }
}
