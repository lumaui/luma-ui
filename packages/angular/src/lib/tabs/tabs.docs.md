---
name: Tabs
type: component
selector: luma-tabs
category: Layout
description: Tabbed interface for organizing content into switchable panels with full accessibility and keyboard navigation
imports:
  - name: LmTabsComponent
    module: '@lumaui/angular'
  - name: LmTabsListDirective
    module: '@lumaui/angular'
  - name: LmTabsTriggerDirective
    module: '@lumaui/angular'
  - name: LmTabsPanelDirective
    module: '@lumaui/angular'
inputs:
  - name: lmValue
    type: 'string | null'
    default: 'null'
    description: Controlled value - currently selected tab
  - name: lmDefaultValue
    type: 'string'
    default: "''"
    description: Default value for uncontrolled mode
  - name: lmVariant
    type: "'underline' | 'background' | 'pill'"
    default: "'underline'"
    description: Visual style variant
  - name: lmLazy
    type: 'boolean'
    default: 'true'
    description: Whether to lazy load panel content
outputs:
  - name: lmValueChange
    type: 'EventEmitter<string>'
    description: Emits when selected tab changes
directives:
  - name: TabsListDirective
    selector: '[lumaTabsList]'
    description: Container for tab triggers with role="tablist"
  - name: TabsTriggerDirective
    selector: '[lumaTabsTrigger]'
    description: Individual tab button with role="tab"
    inputs:
      - name: lumaTabsTrigger
        type: 'string'
        description: Tab value identifier (required)
      - name: lmDisabled
        type: 'boolean'
        default: 'false'
        description: Whether this trigger is disabled
  - name: TabsPanelDirective
    selector: '[lumaTabsPanel]'
    description: Content panel with role="tabpanel" and lazy loading support
    inputs:
      - name: lumaTabsPanel
        type: 'string'
        description: Panel value identifier (required)
  - name: TabsIndicatorComponent
    selector: 'luma-tabs-indicator'
    description: Animated indicator for underline style (optional)
tokenGroups:
  - name: List
    tokens:
      - name: --luma-tabs-list-gap
        value: 8px
        description: Gap between tabs triggers
      - name: --luma-tabs-list-border-color
        value: oklch(0.97 0.006 290)
        description: Border color for underline style
  - name: Trigger
    tokens:
      - name: --luma-tabs-trigger-text
        value: oklch(0.48 0.01 290)
        description: Trigger text color
      - name: --luma-tabs-trigger-text-hover
        value: oklch(0.22 0.014 290)
        description: Trigger text color on hover
      - name: --luma-tabs-trigger-text-selected
        value: oklch(0.48 0.09 300)
        description: Selected trigger text color (primary)
      - name: --luma-tabs-trigger-background
        value: transparent
        description: Trigger background
      - name: --luma-tabs-trigger-background-hover
        value: oklch(0.99 0.004 290)
        description: Trigger hover background
      - name: --luma-tabs-trigger-background-selected
        value: oklch(0.99 0.004 290)
        description: Selected trigger background
      - name: --luma-tabs-trigger-padding-x
        value: 16px
        description: Horizontal padding
      - name: --luma-tabs-trigger-padding-y
        value: 8px
        description: Vertical padding
      - name: --luma-tabs-trigger-font-size
        value: 14px
        description: Font size
      - name: --luma-tabs-trigger-font-weight
        value: '500'
        description: Font weight
      - name: --luma-tabs-trigger-radius
        value: 8px
        description: Border radius
  - name: Indicator
    tokens:
      - name: --luma-tabs-indicator-height
        value: 2px
        description: Indicator height
      - name: --luma-tabs-indicator-color
        value: oklch(0.48 0.09 300)
        description: Indicator color (primary)
      - name: --luma-tabs-indicator-radius
        value: 1px
        description: Indicator border radius
  - name: Panel
    tokens:
      - name: --luma-tabs-panel-padding
        value: 16px
        description: Panel padding
  - name: Pill
    tokens:
      - name: --luma-tabs-pill-background
        value: oklch(0.97 0.006 290)
        description: Pill container background
      - name: --luma-tabs-pill-background-selected
        value: oklch(1 0 0)
        description: Selected pill background
      - name: --luma-tabs-pill-gap
        value: 4px
        description: Gap between pills
      - name: --luma-tabs-pill-padding
        value: 4px
        description: Pill container padding
      - name: --luma-tabs-pill-radius
        value: 12px
        description: Pill container border radius
  - name: Transition
    tokens:
      - name: --luma-tabs-transition-duration
        value: 200ms
        description: Animation duration
      - name: --luma-tabs-transition-timing
        value: ease-out
        description: Animation easing
---

# Tabs

## Purpose

Tabs organize content into separate views where only one view can be visible at a time. The Tabs component follows WAI-ARIA tabs pattern with full keyboard navigation and supports three visual styles to match different UI contexts.

## Usage Examples

### Basic Tabs

```html
<luma-tabs lmDefaultValue="tab-1">
  <div lumaTabsList>
    <button lumaTabsTrigger="tab-1">Overview</button>
    <button lumaTabsTrigger="tab-2">Features</button>
    <button lumaTabsTrigger="tab-3">Pricing</button>
    <button lumaTabsTrigger="tab-4" [lmDisabled]="true">Disabled</button>
  </div>

  <div lumaTabsPanel="tab-1">Overview content goes here...</div>
  <div lumaTabsPanel="tab-2">Features content goes here...</div>
  <div lumaTabsPanel="tab-3">Pricing content goes here...</div>
</luma-tabs>
```

### Controlled Tabs

```html
<luma-tabs [lmValue]="selectedTab()" (lmValueChange)="onTabChange($event)">
  <div lumaTabsList>
    <button lumaTabsTrigger="account">Account</button>
    <button lumaTabsTrigger="security">Security</button>
    <button lumaTabsTrigger="notifications">Notifications</button>
  </div>

  <div lumaTabsPanel="account">Account settings...</div>
  <div lumaTabsPanel="security">Security settings...</div>
  <div lumaTabsPanel="notifications">Notification preferences...</div>
</luma-tabs>
```

### Background Style

```html
<luma-tabs lmDefaultValue="tab-1" lmVariant="background">
  <div lumaTabsList>
    <button lumaTabsTrigger="tab-1">Dashboard</button>
    <button lumaTabsTrigger="tab-2">Analytics</button>
    <button lumaTabsTrigger="tab-3">Reports</button>
  </div>

  <div lumaTabsPanel="tab-1">Dashboard content...</div>
  <div lumaTabsPanel="tab-2">Analytics content...</div>
  <div lumaTabsPanel="tab-3">Reports content...</div>
</luma-tabs>
```

### Pill Style

```html
<luma-tabs lmDefaultValue="tab-1" lmVariant="pill">
  <div lumaTabsList>
    <button lumaTabsTrigger="tab-1">All</button>
    <button lumaTabsTrigger="tab-2">Active</button>
    <button lumaTabsTrigger="tab-3">Completed</button>
  </div>

  <div lumaTabsPanel="tab-1">All items...</div>
  <div lumaTabsPanel="tab-2">Active items...</div>
  <div lumaTabsPanel="tab-3">Completed items...</div>
</luma-tabs>
```

## Performance

### Lazy Loading

Tabs panels are **lazy loaded by default** (`lmLazy="true"`). This means panel content is only rendered when the tab is first selected, improving initial page load performance for tabs with heavy content.

**How it works:**

- Panel content is not rendered until the tab is selected for the first time
- Once rendered, the content stays in the DOM (cached) for instant switching
- Set `[lmLazy]="false"` to render all panels immediately

```html
<!-- Default: lazy loading enabled -->
<luma-tabs lmDefaultValue="tab-1">
  <div lumaTabsList>
    <button lumaTabsTrigger="tab-1">Tab 1</button>
    <button lumaTabsTrigger="tab-2">Tab 2</button>
  </div>

  <!-- Only rendered when tab-1 is selected (default) -->
  <div lumaTabsPanel="tab-1">
    <expensive-component />
  </div>

  <!-- Only rendered when tab-2 is first selected -->
  <div lumaTabsPanel="tab-2">
    <another-expensive-component />
  </div>
</luma-tabs>

<!-- Disable lazy loading to render all panels immediately -->
<luma-tabs lmDefaultValue="tab-1" [lmLazy]="false">
  <div lumaTabsList>
    <button lumaTabsTrigger="tab-1">Tab 1</button>
    <button lumaTabsTrigger="tab-2">Tab 2</button>
  </div>

  <div lumaTabsPanel="tab-1">Content 1</div>
  <div lumaTabsPanel="tab-2">Content 2</div>
</luma-tabs>
```

**When to disable lazy loading:**

- When you need to measure all panel heights upfront
- When panels contain forms that must be pre-validated
- When switching speed is more important than initial load

## Accessibility

The Tabs component implements the WAI-ARIA Tabs pattern:

- **Roles**: `tablist` on the list container, `tab` on triggers, `tabpanel` on panels
- **Roving Tabindex**: Only the selected tab is in the tab order (tabindex="0"), others are tabindex="-1"
- **ARIA Attributes**:
  - `aria-selected`: Indicates the selected tab
  - `aria-controls`: Links tab to its panel
  - `aria-labelledby`: Links panel to its tab
  - `aria-orientation`: Indicates horizontal layout

### Keyboard Navigation

| Key         | Action                        |
| ----------- | ----------------------------- |
| Arrow Right | Focus and select next tab     |
| Arrow Left  | Focus and select previous tab |
| Home        | Focus and select first tab    |
| End         | Focus and select last tab     |
| Enter/Space | Activate focused tab          |

## Use Cases

### Settings Page

Organize user preferences.

```typescript
@Component({
  template: `
    <luma-tabs [lmValue]="activeTab()" (lmValueChange)="activeTab.set($event)">
      <div lumaTabsList>
        <button lumaTabsTrigger="profile">Profile</button>
        <button lumaTabsTrigger="security">Security</button>
        <button lumaTabsTrigger="notifications">Notifications</button>
      </div>

      <div lumaTabsPanel="profile">
        <profile-settings />
      </div>
      <div lumaTabsPanel="security">
        <security-settings />
      </div>
      <div lumaTabsPanel="notifications">
        <notification-settings />
      </div>
    </luma-tabs>
  `,
})
export class SettingsComponent {
  activeTab = signal('profile');
}
```

### Product Details

Switch between product information sections.

```html
<luma-tabs lmDefaultValue="description">
  <div lumaTabsList>
    <button lumaTabsTrigger="description">Description</button>
    <button lumaTabsTrigger="specs">Specifications</button>
    <button lumaTabsTrigger="reviews">Reviews ({{ reviewCount }})</button>
  </div>

  <div lumaTabsPanel="description">
    <p>{{ product.description }}</p>
  </div>
  <div lumaTabsPanel="specs">
    <dl>
      @for (spec of product.specs; track spec.name) {
      <dt>{{ spec.name }}</dt>
      <dd>{{ spec.value }}</dd>
      }
    </dl>
  </div>
  <div lumaTabsPanel="reviews">
    <review-list [productId]="product.id" />
  </div>
</luma-tabs>
```

### Dashboard Filters

Quick data view switching.

```html
<luma-tabs lmDefaultValue="day" lmVariant="pill">
  <div lumaTabsList>
    <button lumaTabsTrigger="day">Today</button>
    <button lumaTabsTrigger="week">This Week</button>
    <button lumaTabsTrigger="month">This Month</button>
    <button lumaTabsTrigger="year">This Year</button>
  </div>

  <div lumaTabsPanel="day"><daily-chart /></div>
  <div lumaTabsPanel="week"><weekly-chart /></div>
  <div lumaTabsPanel="month"><monthly-chart /></div>
  <div lumaTabsPanel="year"><yearly-chart /></div>
</luma-tabs>
```

## Neo-Minimal Principles

### Visual Silence

The three tab styles offer different levels of visual weight:

- **Underline**: Minimal, just a 2px indicator line
- **Background**: Subtle fill on selected tab
- **Pill**: Contained design with soft background

### Calm Interactions

- **Smooth transitions**: 200ms with ease-out easing
- **Animated indicator**: Slides naturally between tabs
- **No jarring effects**: Focus rings are visible but subtle

### Functional Whitespace

- Consistent padding creates rhythm
- Gap between tabs provides visual separation
- Panel padding gives content breathing room
