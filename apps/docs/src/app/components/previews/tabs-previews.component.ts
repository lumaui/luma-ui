import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import {
  LmTabsComponent,
  LmTabsListDirective,
  LmTabsTriggerDirective,
  LmTabsPanelDirective,
  LmTabsIndicatorComponent,
} from '@lumaui/angular';

@Component({
  selector: 'app-tabs-previews',
  imports: [
    LmTabsComponent,
    LmTabsListDirective,
    LmTabsTriggerDirective,
    LmTabsPanelDirective,
    LmTabsIndicatorComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tabs-previews.component.html',
})
export class TabsPreviewsComponent {
  exampleId = input.required<string>();

  // State for Controlled Tabs
  selectedTab = signal<string>('account');
}
