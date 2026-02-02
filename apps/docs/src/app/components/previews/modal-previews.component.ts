import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import {
  ButtonDirective,
  ModalComponent,
  ModalOverlayComponent,
  ModalContainerComponent,
  ModalHeaderDirective,
  ModalTitleDirective,
  ModalContentDirective,
  ModalFooterDirective,
  ModalCloseComponent,
} from '@lumaui/angular';

@Component({
  selector: 'app-modal-previews',
  imports: [
    UpperCasePipe,
    ButtonDirective,
    ModalComponent,
    ModalOverlayComponent,
    ModalContainerComponent,
    ModalHeaderDirective,
    ModalTitleDirective,
    ModalContentDirective,
    ModalFooterDirective,
    ModalCloseComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (exampleId()) {
      @case ('basic-modal') {
        <div class="flex flex-col items-center gap-4">
          <button lumaButton lmVariant="primary" (click)="basicOpen.set(true)">
            Open Modal
          </button>
          <luma-modal
            [lmOpen]="basicOpen()"
            (lmOpenChange)="basicOpen.set($event)"
          >
            <luma-modal-overlay>
              <luma-modal-container>
                <luma-modal-close />
                <div lumaModalHeader>
                  <h2 lumaModalTitle>Modal Title</h2>
                </div>
                <div lumaModalContent>
                  <p class="lm-text-secondary">Modal content goes here...</p>
                </div>
                <div lumaModalFooter>
                  <button
                    lumaButton
                    lmVariant="ghost"
                    lmSize="sm"
                    (click)="basicOpen.set(false)"
                  >
                    Cancel
                  </button>
                  <button
                    lumaButton
                    lmVariant="primary"
                    lmSize="sm"
                    (click)="basicOpen.set(false)"
                  >
                    Confirm
                  </button>
                </div>
              </luma-modal-container>
            </luma-modal-overlay>
          </luma-modal>
        </div>
      }
      @case ('different-sizes') {
        <div class="flex flex-wrap gap-2 justify-center">
          @for (size of sizes; track size) {
            <button lumaButton lmVariant="outline" (click)="openSize(size)">
              {{ size }}
            </button>
          }
          <luma-modal
            [lmOpen]="sizeOpen()"
            [lmSize]="currentSize()"
            (lmOpenChange)="sizeOpen.set($event)"
          >
            <luma-modal-overlay>
              <luma-modal-container>
                <luma-modal-close />
                <div lumaModalHeader>
                  <h2 lumaModalTitle>{{ currentSize() | uppercase }} Modal</h2>
                </div>
                <div lumaModalContent>
                  <p class="lm-text-secondary">
                    This is a {{ currentSize() }} sized modal.
                  </p>
                </div>
                <div lumaModalFooter>
                  <button
                    lumaButton
                    lmVariant="primary"
                    lmSize="sm"
                    (click)="sizeOpen.set(false)"
                  >
                    Close
                  </button>
                </div>
              </luma-modal-container>
            </luma-modal-overlay>
          </luma-modal>
        </div>
      }
      @case ('scrollable-content') {
        <div class="flex flex-col items-center gap-4">
          <button lumaButton lmVariant="primary" (click)="scrollOpen.set(true)">
            Open Scrollable Modal
          </button>
          <luma-modal
            [lmOpen]="scrollOpen()"
            lmSize="md"
            (lmOpenChange)="scrollOpen.set($event)"
          >
            <luma-modal-overlay>
              <luma-modal-container>
                <luma-modal-close />
                <div lumaModalHeader>
                  <h2 lumaModalTitle>Terms of Service</h2>
                </div>
                <div lumaModalContent [lmScrollable]="true">
                  @for (i of scrollSections; track i) {
                    <div class="mb-4">
                      <h3 class="font-medium mb-1">Section {{ i }}</h3>
                      <p class="lm-text-secondary text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation.
                      </p>
                    </div>
                  }
                </div>
                <div lumaModalFooter>
                  <button
                    lumaButton
                    lmVariant="primary"
                    lmSize="sm"
                    (click)="scrollOpen.set(false)"
                  >
                    Accept
                  </button>
                </div>
              </luma-modal-container>
            </luma-modal-overlay>
          </luma-modal>
        </div>
      }
      @case ('uncontrolled-mode') {
        <div class="flex flex-col items-center gap-4">
          <button
            lumaButton
            lmVariant="outline"
            (click)="uncontrolledOpen.set(true)"
          >
            Open Confirmation
          </button>
          <luma-modal
            [lmDefaultOpen]="false"
            [lmOpen]="uncontrolledOpen()"
            (lmOpenChange)="uncontrolledOpen.set($event)"
          >
            <luma-modal-overlay>
              <luma-modal-container>
                <div lumaModalContent>
                  <p class="lm-text-secondary">
                    Are you sure you want to proceed?
                  </p>
                </div>
                <div lumaModalFooter>
                  <button
                    lumaButton
                    lmVariant="ghost"
                    lmSize="sm"
                    (click)="uncontrolledOpen.set(false)"
                  >
                    No
                  </button>
                  <button
                    lumaButton
                    lmVariant="primary"
                    lmSize="sm"
                    (click)="uncontrolledOpen.set(false)"
                  >
                    Yes
                  </button>
                </div>
              </luma-modal-container>
            </luma-modal-overlay>
          </luma-modal>
        </div>
      }
      @case ('footer-alignment') {
        <div class="flex flex-col items-center gap-4">
          <div class="flex flex-wrap gap-2 justify-center">
            @for (align of alignments; track align) {
              <button lumaButton lmVariant="outline" (click)="openAlign(align)">
                {{ align }}
              </button>
            }
          </div>
          <luma-modal
            [lmOpen]="alignOpen()"
            (lmOpenChange)="alignOpen.set($event)"
          >
            <luma-modal-overlay>
              <luma-modal-container>
                <luma-modal-close />
                <div lumaModalHeader>
                  <h2 lumaModalTitle>Footer: {{ currentAlign() }}</h2>
                </div>
                <div lumaModalContent>
                  <p class="lm-text-secondary">Footer alignment example.</p>
                </div>
                <div lumaModalFooter [lmAlign]="currentAlign()">
                  <button
                    lumaButton
                    lmVariant="ghost"
                    lmSize="sm"
                    (click)="alignOpen.set(false)"
                  >
                    Cancel
                  </button>
                  <button
                    lumaButton
                    lmVariant="primary"
                    lmSize="sm"
                    (click)="alignOpen.set(false)"
                  >
                    Confirm
                  </button>
                </div>
              </luma-modal-container>
            </luma-modal-overlay>
          </luma-modal>
        </div>
      }
      @default {
        <div class="lm-text-secondary text-sm text-center">
          Preview not available for this example
        </div>
      }
    }
  `,
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
