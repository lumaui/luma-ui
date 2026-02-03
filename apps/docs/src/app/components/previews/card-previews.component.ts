import {
  LmButtonDirective,
  LmCardComponent,
  LmCardContentDirective,
  LmCardDescriptionDirective,
  LmCardHeaderDirective,
  LmCardTitleDirective,
} from '@lumaui/angular';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-card-previews',
  imports: [
    LmButtonDirective,
    LmCardComponent,
    LmCardHeaderDirective,
    LmCardTitleDirective,
    LmCardDescriptionDirective,
    LmCardContentDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (exampleId()) {
      @case ('basic-card') {
        <luma-card>
          <div lumaCardHeader>
            <h3 lumaCardTitle>Card Title</h3>
            <p lumaCardDescription>
              This is a description of the card content.
            </p>
          </div>
          <div lumaCardContent>
            <p>Main content goes here.</p>
          </div>
        </luma-card>
      }
      @case ('stats-card') {
        <luma-card lmVariant="shadow">
          <div lumaCardHeader>
            <h3 lumaCardTitle lmSize="small">Total Revenue</h3>
          </div>
          <div lumaCardContent>
            <p class="text-3xl font-bold">$45,231.89</p>
            <p class="text-xs lm-text-secondary">+20.1% from last month</p>
          </div>
        </luma-card>
      }
      @case ('minimal-card-no-header') {
        <luma-card lmVariant="nested">
          <div lumaCardContent>
            <p>Simple content without header or title.</p>
          </div>
        </luma-card>
      }
      @case ('card-with-custom-content') {
        <luma-card lmVariant="shadow">
          <div lumaCardHeader>
            <h3 lumaCardTitle>User Profile</h3>
            <p lumaCardDescription>Manage your account settings</p>
          </div>
          <div lumaCardContent>
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 rounded-full lm-bg-primary/20 flex items-center justify-center"
              >
                <span class="text-primary font-medium">JD</span>
              </div>
              <div>
                <p class="font-medium">John Doe</p>
                <p class="text-sm lm-text-secondary">john&#64;example.com</p>
              </div>
            </div>
          </div>
        </luma-card>
      }
      @case ('default') {
        <luma-card>
          <div lumaCardHeader>
            <h3 lumaCardTitle>Default Card</h3>
            <p lumaCardDescription>Card with gradient border style</p>
          </div>
          <div lumaCardContent>
            <p>Content with gradient wrapper styling.</p>
          </div>
        </luma-card>
      }
      @case ('shadow') {
        <luma-card lmVariant="shadow">
          <div lumaCardHeader>
            <h3 lumaCardTitle>Shadow Card</h3>
            <p lumaCardDescription>Elevated card with subtle shadow</p>
          </div>
          <div lumaCardContent>
            <p>Primary content with clean, elevated appearance.</p>
          </div>
        </luma-card>
      }
      @case ('nested') {
        <luma-card lmVariant="shadow">
          <div lumaCardHeader>
            <h3 lumaCardTitle>Parent Card</h3>
          </div>
          <div lumaCardContent>
            <luma-card lmVariant="nested">
              <div lumaCardContent>
                <p>Nested content with subtle differentiation.</p>
              </div>
            </luma-card>
          </div>
        </luma-card>
      }
      @case ('preview') {
        <luma-card lmVariant="preview">
          <div lumaCardContent>
            <div class="flex items-center justify-center p-8">
              <button lumaButton lmVariant="primary">Preview Button</button>
            </div>
          </div>
        </luma-card>
      }
      @case ('dashboard-layout-with-mixed-variants') {
        <luma-card lmVariant="shadow" class="w-full">
          <div lumaCardHeader>
            <h2 lumaCardTitle lmSize="large">Dashboard</h2>
          </div>
          <div lumaCardContent>
            <div class="grid grid-cols-3 gap-4">
              <luma-card lmVariant="nested">
                <div lumaCardContent>
                  <p class="text-xs lm-text-secondary">Users</p>
                  <p class="text-2xl font-bold">1,234</p>
                </div>
              </luma-card>
              <luma-card lmVariant="nested">
                <div lumaCardContent>
                  <p class="text-xs lm-text-secondary">Revenue</p>
                  <p class="text-2xl font-bold">$12.5k</p>
                </div>
              </luma-card>
              <luma-card lmVariant="nested">
                <div lumaCardContent>
                  <p class="text-xs lm-text-secondary">Growth</p>
                  <p class="text-2xl font-bold">+15%</p>
                </div>
              </luma-card>
            </div>
          </div>
        </luma-card>
      }
      @default {
        <div class="lm-text-secondary text-sm text-center">
          Preview not available for this example
        </div>
      }
    }
  `,
})
export class CardPreviewsComponent {
  exampleId = input.required<string>();
}
