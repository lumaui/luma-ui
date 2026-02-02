import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import {
  TabsComponent,
  TabsListDirective,
  TabsTriggerDirective,
  TabsPanelDirective,
  TabsIndicatorComponent,
} from '@lumaui/angular';

@Component({
  selector: 'app-tabs-previews',
  imports: [
    TabsComponent,
    TabsListDirective,
    TabsTriggerDirective,
    TabsPanelDirective,
    TabsIndicatorComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (exampleId()) {
      @case ('basic-tabs') {
        <luma-tabs lmDefaultValue="tab-1" class="w-full">
          <div lumaTabsList>
            <button lumaTabsTrigger="tab-1">Overview</button>
            <button lumaTabsTrigger="tab-2">Features</button>
            <button lumaTabsTrigger="tab-3">Pricing</button>
            <button lumaTabsTrigger="tab-4" [lmDisabled]="true">
              Disabled
            </button>
            <luma-tabs-indicator />
          </div>

          <div lumaTabsPanel="tab-1">
            <p class="lm-text-secondary">
              Welcome to our product overview. Here you'll find everything you
              need to get started.
            </p>
          </div>
          <div lumaTabsPanel="tab-2">
            <p class="lm-text-secondary">
              Explore our powerful features designed to boost your productivity.
            </p>
          </div>
          <div lumaTabsPanel="tab-3">
            <p class="lm-text-secondary">
              Simple, transparent pricing that scales with your needs.
            </p>
          </div>
        </luma-tabs>
      }
      @case ('controlled-tabs') {
        <div class="w-full space-y-3">
          <div class="text-xs lm-text-secondary px-1">
            Selected:
            <code class="lm-bg-surface-base px-1.5 py-0.5 rounded font-mono">{{
              selectedTab() || 'none'
            }}</code>
          </div>
          <luma-tabs
            [lmValue]="selectedTab()"
            (lmValueChange)="selectedTab.set($event)"
          >
            <div lumaTabsList>
              <button lumaTabsTrigger="account">Account</button>
              <button lumaTabsTrigger="security">Security</button>
              <button lumaTabsTrigger="notifications">Notifications</button>
              <luma-tabs-indicator />
            </div>

            <div lumaTabsPanel="account">
              <p class="lm-text-secondary">Manage your account settings.</p>
            </div>
            <div lumaTabsPanel="security">
              <p class="lm-text-secondary">Configure security options.</p>
            </div>
            <div lumaTabsPanel="notifications">
              <p class="lm-text-secondary">
                Set your notification preferences.
              </p>
            </div>
          </luma-tabs>
        </div>
      }
      @case ('background-style') {
        <luma-tabs lmDefaultValue="tab-1" lmVariant="background" class="w-full">
          <div lumaTabsList>
            <button lumaTabsTrigger="tab-1">Dashboard</button>
            <button lumaTabsTrigger="tab-2">Analytics</button>
            <button lumaTabsTrigger="tab-3">Reports</button>
            <button lumaTabsTrigger="tab-4" [lmDisabled]="true">
              Disabled
            </button>
          </div>

          <div lumaTabsPanel="tab-1">
            <p class="lm-text-secondary">
              Dashboard overview with key metrics and insights.
            </p>
          </div>
          <div lumaTabsPanel="tab-2">
            <p class="lm-text-secondary">
              Detailed analytics and data visualization.
            </p>
          </div>
          <div lumaTabsPanel="tab-3">
            <p class="lm-text-secondary">
              Generate and download comprehensive reports.
            </p>
          </div>
        </luma-tabs>
      }
      @case ('pill-style') {
        <luma-tabs lmDefaultValue="tab-1" lmVariant="pill" class="w-full">
          <div lumaTabsList>
            <button lumaTabsTrigger="tab-1">All</button>
            <button lumaTabsTrigger="tab-2">Active</button>
            <button lumaTabsTrigger="tab-3">Completed</button>
            <button lumaTabsTrigger="tab-4" [lmDisabled]="true">
              Disabled
            </button>
          </div>

          <div lumaTabsPanel="tab-1">
            <p class="lm-text-secondary">Showing all items in the list.</p>
          </div>
          <div lumaTabsPanel="tab-2">
            <p class="lm-text-secondary">
              Showing only active items that need attention.
            </p>
          </div>
          <div lumaTabsPanel="tab-3">
            <p class="lm-text-secondary">
              Showing completed items for reference.
            </p>
          </div>
        </luma-tabs>
      }
      @default {
        <div class="lm-text-secondary text-sm text-center">
          Preview not available for this example
        </div>
      }
    }
  `,
})
export class TabsPreviewsComponent {
  exampleId = input.required<string>();

  // State for Controlled Tabs
  selectedTab = signal<string>('account');
}
