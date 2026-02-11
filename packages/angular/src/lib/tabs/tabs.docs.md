---
name: Tabs
type: component
selector: luma-tabs
category: Layout
description: Tab navigation component with underline and pills styles using semantic tokens.
imports:
  - name: LmTabsComponent
    module: '@lumaui/angular'
  - name: LmTabsListDirective
    module: '@lumaui/angular'
  - name: LmTabsTriggerDirective
    module: '@lumaui/angular'
  - name: LmTabsPanelDirective
    module: '@lumaui/angular'
  - name: LmTabsIndicatorComponent
    module: '@lumaui/angular'
inputs:
  - name: lmVariant
    type: "'underline' | 'pills'"
    default: "'underline'"
    description: Visual style variant
  - name: lmDefaultValue
    type: string
    default: "''"
    description: Initially selected tab (uncontrolled mode)
  - name: lmValue
    type: string | null
    default: 'null'
    description: Currently selected tab (controlled mode)
  - name: lmLazy
    type: boolean
    default: 'true'
    description: Whether to lazy load panel content
directives:
  - name: lumaTabsList
    selector: '[lumaTabsList]'
    description: Container for tab triggers (role="tablist")
    inputs:
      - name: lmScrollable
        type: boolean
        default: 'false'
        description: Enable horizontal scrolling for overflowing tabs
  - name: lumaTabsTrigger
    selector: '[lumaTabsTrigger]'
    description: Individual tab button (role="tab")
    inputs:
      - name: lumaTabsTrigger
        type: string
        description: Unique identifier that links this trigger to its panel
      - name: lmDisabled
        type: boolean
        default: 'false'
        description: Whether this tab trigger is disabled
  - name: lumaTabsPanel
    selector: '[lumaTabsPanel]'
    description: Content panel (role="tabpanel")
    inputs:
      - name: lumaTabsPanel
        type: string
        description: Unique identifier matching the corresponding trigger
  - name: luma-tabs-indicator
    selector: luma-tabs-indicator
    description: Animated underline indicator (only visible for underline variant)
---

# Tabs

## Purpose

Tab navigation for switching between content panels. Uses semantic tokens with data-state attributes for active styling. Supports underline and pills variants, controlled and uncontrolled modes, lazy loading, and horizontal scrolling.

## Semantic Token Usage

**Underline variant:**

- Active: `data-[state=active]:border-primary-9`, `data-[state=active]:text-primary-9`
- Inactive: `text-gray-600`
- Indicator: `bg-primary-9`

**Pills variant:**

- Container: `bg-gray-100`, `rounded-[var(--radius-4)]`
- Active: `data-[state=active]:bg-white`, `data-[state=active]:shadow-[var(--shadow-1)]`
- Inactive: `text-gray-600`

## Usage Examples

### Basic Tabs

```html
<luma-tabs lmDefaultValue="tab-1">
  <div lumaTabsList>
    <button lumaTabsTrigger="tab-1">Overview</button>
    <button lumaTabsTrigger="tab-2">Features</button>
    <button lumaTabsTrigger="tab-3">Pricing</button>
    <luma-tabs-indicator />
  </div>

  <div lumaTabsPanel="tab-1">
    <p>
      Welcome to our product overview. Here you'll find everything you need to
      get started.
    </p>
  </div>
  <div lumaTabsPanel="tab-2">
    <p>Explore our powerful features designed to boost your productivity.</p>
  </div>
  <div lumaTabsPanel="tab-3">
    <p>Simple, transparent pricing that scales with your needs.</p>
  </div>
</luma-tabs>
```

### Variants

```html
<!-- Underline style (default) — uses animated indicator -->
<luma-tabs lmDefaultValue="account" lmVariant="underline">
  <div lumaTabsList>
    <button lumaTabsTrigger="account">Account</button>
    <button lumaTabsTrigger="security">Security</button>
    <button lumaTabsTrigger="notifications">Notifications</button>
    <luma-tabs-indicator />
  </div>

  <div lumaTabsPanel="account">
    <p>Manage your account settings and preferences.</p>
  </div>
  <div lumaTabsPanel="security">
    <p>Configure passwords, two-factor authentication, and sessions.</p>
  </div>
  <div lumaTabsPanel="notifications">
    <p>Choose which notifications you'd like to receive.</p>
  </div>
</luma-tabs>

<!-- Pills style — no indicator needed, uses background/shadow for active state -->
<luma-tabs lmDefaultValue="all" lmVariant="pills">
  <div lumaTabsList>
    <button lumaTabsTrigger="all">All</button>
    <button lumaTabsTrigger="active">Active</button>
    <button lumaTabsTrigger="completed">Completed</button>
    <button lumaTabsTrigger="archived" [lmDisabled]="true">Archived</button>
  </div>

  <div lumaTabsPanel="all">
    <p>Showing all items in the list.</p>
  </div>
  <div lumaTabsPanel="active">
    <p>Showing only active items that need attention.</p>
  </div>
  <div lumaTabsPanel="completed">
    <p>Showing completed items for reference.</p>
  </div>
  <div lumaTabsPanel="archived">
    <p>Archived items are read-only.</p>
  </div>
</luma-tabs>
```

### Controlled Tabs

```html
<!-- Controlled mode: bind [lmValue] and (lmValueChange) -->
<!-- In your component class: selectedTab = signal<string>('account'); -->
<luma-tabs [lmValue]="selectedTab()" (lmValueChange)="selectedTab.set($event)">
  <div lumaTabsList>
    <button lumaTabsTrigger="account">Account</button>
    <button lumaTabsTrigger="security">Security</button>
    <button lumaTabsTrigger="notifications">Notifications</button>
    <luma-tabs-indicator />
  </div>

  <div lumaTabsPanel="account">
    <p>Manage your account settings.</p>
  </div>
  <div lumaTabsPanel="security">
    <p>Configure security options.</p>
  </div>
  <div lumaTabsPanel="notifications">
    <p>Set your notification preferences.</p>
  </div>
</luma-tabs>
```

### Scrollable Tabs

Enable horizontal scrolling with arrow navigation for tabs that overflow the container:

```html
<!-- Set [lmScrollable]="true" on the list directive -->
<luma-tabs lmDefaultValue="mon">
  <div lumaTabsList [lmScrollable]="true">
    <button lumaTabsTrigger="mon">Monday</button>
    <button lumaTabsTrigger="tue">Tuesday</button>
    <button lumaTabsTrigger="wed">Wednesday</button>
    <button lumaTabsTrigger="thu">Thursday</button>
    <button lumaTabsTrigger="fri">Friday</button>
    <button lumaTabsTrigger="sat">Saturday</button>
    <button lumaTabsTrigger="sun">Sunday</button>
    <button lumaTabsTrigger="summary">Weekly Summary</button>
    <luma-tabs-indicator />
  </div>

  <div lumaTabsPanel="mon">
    <p>Monday schedule and tasks.</p>
  </div>
  <div lumaTabsPanel="tue">
    <p>Tuesday schedule and tasks.</p>
  </div>
  <div lumaTabsPanel="wed">
    <p>Wednesday schedule and tasks.</p>
  </div>
  <div lumaTabsPanel="thu">
    <p>Thursday schedule and tasks.</p>
  </div>
  <div lumaTabsPanel="fri">
    <p>Friday schedule and tasks.</p>
  </div>
  <div lumaTabsPanel="sat">
    <p>Saturday schedule and tasks.</p>
  </div>
  <div lumaTabsPanel="sun">
    <p>Sunday schedule and tasks.</p>
  </div>
  <div lumaTabsPanel="summary">
    <p>Overview of the entire week.</p>
  </div>
</luma-tabs>
```

**Features:**

- **Arrow Navigation**: Left/right arrow buttons appear automatically when content overflows
- **Smart Visibility**: Arrows hide when at start/end positions
- **Smooth Scrolling**: Arrows scroll by 85% of container width for visual continuity
- **Keyboard Support**: Arrow Left/Right keys still navigate between tabs (not scroll)
- **Mouse Wheel**: Vertical scroll converts to horizontal for natural navigation
- **Touch Friendly**: Supports swipe gestures on touch devices
- **Automatic Detection**: ResizeObserver detects overflow when tabs are added/removed dynamically

**Accessibility:**

- Arrow buttons have `aria-label` for screen readers
- Disabled state at scroll boundaries (`opacity-30`, `cursor-not-allowed`)
- 32×32px touch targets
- Focus rings on arrow buttons

### Custom Styled

```html
<!-- Scoped CSS variable overrides shift the pills palette -->
<luma-tabs lmDefaultValue="design" lmVariant="pills">
  <div
    lumaTabsList
    class="[--color-muted:oklch(0.94_0.04_270)] [--color-foreground:oklch(0.35_0.05_270)]"
  >
    <button lumaTabsTrigger="design">Design</button>
    <button lumaTabsTrigger="develop">Develop</button>
    <button lumaTabsTrigger="deploy">Deploy</button>
  </div>

  <div lumaTabsPanel="design">
    <div class="space-y-2">
      <h4 class="text-sm font-medium">Design Phase</h4>
      <p class="text-sm text-muted-foreground">
        Create wireframes, mockups, and prototypes for your project.
      </p>
      <div class="flex gap-2 pt-1">
        <span
          class="text-xs bg-primary-2 text-primary-9 px-2 py-0.5 rounded-full"
          >Figma</span
        >
        <span
          class="text-xs bg-primary-2 text-primary-9 px-2 py-0.5 rounded-full"
          >Prototype</span
        >
      </div>
    </div>
  </div>
  <div lumaTabsPanel="develop">
    <div class="space-y-2">
      <h4 class="text-sm font-medium">Development Phase</h4>
      <p class="text-sm text-muted-foreground">
        Write code, run tests, and iterate on your implementation.
      </p>
      <div class="flex gap-2 pt-1">
        <span
          class="text-xs bg-primary-2 text-primary-9 px-2 py-0.5 rounded-full"
          >Angular</span
        >
        <span
          class="text-xs bg-primary-2 text-primary-9 px-2 py-0.5 rounded-full"
          >Tailwind</span
        >
      </div>
    </div>
  </div>
  <div lumaTabsPanel="deploy">
    <div class="space-y-2">
      <h4 class="text-sm font-medium">Deployment Phase</h4>
      <p class="text-sm text-muted-foreground">
        Ship to production with CI/CD pipelines and monitoring.
      </p>
      <div class="flex gap-2 pt-1">
        <span
          class="text-xs bg-primary-2 text-primary-9 px-2 py-0.5 rounded-full"
          >CI/CD</span
        >
        <span
          class="text-xs bg-primary-2 text-primary-9 px-2 py-0.5 rounded-full"
          >Docker</span
        >
      </div>
    </div>
  </div>
</luma-tabs>
```

## Customizing

### Global Override

```css
:root {
  --color-primary-9: oklch(0.6 0.15 180); /* Cyan indicator/active color */
}
```

### Scoped Override

```css
.my-section {
  --color-primary-9: oklch(0.7 0.12 340); /* Pink tabs in this section */
}
```

## Accessibility

- ✅ Keyboard navigation (Arrow Left/Right, Home, End, Enter, Space)
- ✅ ARIA attributes (`role="tablist"`, `role="tab"`, `role="tabpanel"`)
- ✅ Roving tabindex for focus management
- ✅ `aria-selected` and `aria-controls` linkage
- ✅ Focus-visible ring states
- ✅ Disabled tab support (`[lmDisabled]="true"`)
- ✅ Screen reader announcements

## Implementation Notes

- Uses `data-[state=active]` for active tab styling
- `luma-tabs-indicator` is only visible for the underline variant (hidden via `opacity-0` for pills)
- Lazy loading is enabled by default (`lmLazy` defaults to `true`) — panels render only after first selection
- Controlled mode uses `[lmValue]` + `(lmValueChange)`; uncontrolled mode uses `lmDefaultValue`
- OnPush change detection throughout
