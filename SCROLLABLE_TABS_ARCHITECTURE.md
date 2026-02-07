# Scrollable Tabs Architecture

## Component Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ LmTabsListDirective (now Component)                             │
│ Host: <div lumaTabsList [lmScrollable]="true">                  │
│ Role: tablist, aria-orientation: horizontal                     │
│ Classes: relative, flex, items-center, w-full, [variant]        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────┐  ┌──────────────────────────────────────┐  ┌──────┐  │
│  │  ◄   │  │  Scroll Container                    │  │  ►   │  │
│  │      │  │  #scrollContainer                    │  │      │  │
│  │ Left │  │  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ │  │Right │  │
│  │Arrow │  │  │Tab1│ │Tab2│ │Tab3│ │Tab4│ │Tab5│ │  │Arrow │  │
│  │      │  │  └────┘ └────┘ └────┘ └────┘ └────┘ │  │      │  │
│  │      │  │  overflow-x-auto                     │  │      │  │
│  │      │  │  scrollbar-none                      │  │      │  │
│  │      │  │  scroll-smooth                       │  │      │  │
│  └──────┘  └──────────────────────────────────────┘  └──────┘  │
│  z-10       flex, items-center, w-full               z-10      │
│  left-0                                               right-0   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## State Management

```typescript
// Signals controlling arrow visibility and state
showArrows = signal<boolean>(false);       // Show arrows when overflow
showLeftArrow = signal<boolean>(false);    // Enable left arrow
showRightArrow = signal<boolean>(false);   // Enable right arrow

// Computed classes
hostClasses = computed(() =>
  tabsListVariants({ variant: this.tabsGroup.lmVariant() })
);

scrollContainerClasses = computed(() => {
  const base = ['flex', 'items-center', 'w-full'];
  if (this.lmScrollable()) {
    return [...base, 'overflow-x-auto', 'scrollbar-none', 'scroll-smooth'];
  }
  return [...base, variant-specific-gap];
});

leftArrowClasses = computed(() =>
  tabsScrollArrowVariants({ direction: 'left' })
);

rightArrowClasses = computed(() =>
  tabsScrollArrowVariants({ direction: 'right' })
);
```

## Overflow Detection Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     Component Lifecycle                          │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
                    ngAfterViewInit()
                            │
                            ├─ isPlatformBrowser? ──No──► Return
                            │
                            Yes
                            │
                            ▼
                 Create ResizeObserver
                            │
                            ├─ Observe scroll container
                            ├─ Observe all child elements
                            ▼
              Initial updateArrowsVisibility()
                            │
┌───────────────────────────┴───────────────────────────┐
│                                                        │
▼                                                        ▼
ResizeObserver Callback                         Scroll Event Listener
(container/content resize)                      (user scrolls)
│                                                        │
└───────────────────────────┬───────────────────────────┘
                            │
                            ▼
                updateArrowsVisibility()
                            │
                ┌───────────┴───────────┐
                │                       │
                ▼                       ▼
    Check overflow               Update arrow states
    scrollWidth > clientWidth    - isAtStart?
                │                - isAtEnd?
                ├─ No overflow
                │  showArrows.set(false)
                │
                └─ Has overflow
                   showArrows.set(true)
                   showLeftArrow.set(!isAtStart)
                   showRightArrow.set(!isAtEnd)
```

## Scroll Behavior

```
┌─────────────────────────────────────────────────────────────────┐
│                     User Interactions                            │
└─────────────────────────────────────────────────────────────────┘
          │              │              │
          │              │              │
    ┌─────▼────┐   ┌────▼────┐   ┌────▼─────┐
    │Click Left│   │Click    │   │Mouse     │
    │Arrow     │   │Right    │   │Wheel     │
    │          │   │Arrow    │   │          │
    └─────┬────┘   └────┬────┘   └────┬─────┘
          │              │              │
          ▼              ▼              ▼
    scrollPrevious() scrollNext()  onWheel(event)
          │              │              │
          │              │              ├─ preventDefault()
          │              │              ├─ scrollLeft += deltaY
          │              │              │
          ▼              ▼              ▼
    scrollBy({         scrollBy({      Direct scroll
      left: -85%,        left: +85%,    manipulation
      behavior: 'smooth' behavior: 'smooth'
    })                 })
          │              │              │
          └──────────────┴──────────────┘
                         │
                         ▼
                  Scroll Event Fires
                         │
                         ▼
              updateArrowsVisibility()
                         │
                         ▼
              Update arrow states
```

## Scroll Amount Calculation

```
Container Width: 600px
Scroll Amount: 600px × 0.85 = 510px

┌────────────────────────────────────────────────────┐
│ Viewport (600px)                                   │
│ ┌──────────────────────────────────────┐           │
│ │ Tab1 │ Tab2 │ Tab3 │ Tab4 │ Tab5      │Tab6│...  │
│ └──────────────────────────────────────┘           │
│                                        ▲            │
│                                        │            │
│                                    90px overlap     │
│                                    (15% of width)   │
└────────────────────────────────────────────────────┘

After clicking right arrow:

┌────────────────────────────────────────────────────┐
│ Viewport (600px)                                   │
│      ┌──────────────────────────────────────┐      │
│ ...│Tab3│Tab4│ Tab5 │ Tab6 │ Tab7 │ Tab8    │...   │
│      └──────────────────────────────────────┘      │
│      ▲                                              │
│      │                                              │
│  90px overlap - shows partial Tab3                  │
│  (visual continuity indicator)                      │
└────────────────────────────────────────────────────┘
```

## Arrow State Logic

```
┌─────────────────────────────────────────────────────────────────┐
│                     Scroll Position States                       │
└─────────────────────────────────────────────────────────────────┘

State 1: At Start (scrollLeft ≤ 1)
┌──────────────────────────────────────────────┐
│ [X] ◄  │ Tab1 │ Tab2 │ Tab3 │...  │ ► [✓]   │
│         ▲                                    │
│         └─ scrollLeft = 0                    │
└──────────────────────────────────────────────┘
Left arrow: disabled (opacity-30)
Right arrow: enabled

State 2: In Middle
┌──────────────────────────────────────────────┐
│ [✓] ◄  ...│ Tab3 │ Tab4 │ Tab5 │... │ ► [✓]  │
│              ▲                               │
│              └─ scrollLeft > 1 AND < max     │
└──────────────────────────────────────────────┘
Left arrow: enabled
Right arrow: enabled

State 3: At End (scrollLeft ≥ scrollWidth - clientWidth - 1)
┌──────────────────────────────────────────────┐
│ [✓] ◄  ...│ Tab8 │ Tab9 │ Tab10│  ► [X]      │
│                              ▲               │
│                              └─ scrollLeft = max
└──────────────────────────────────────────────┘
Left arrow: enabled
Right arrow: disabled (opacity-30)

Note: ±1px tolerance handles sub-pixel rendering issues
```

## CSS Class Application

```
┌─────────────────────────────────────────────────────────────────┐
│                     Host Element Classes                         │
│  (from tabsListVariants)                                        │
└─────────────────────────────────────────────────────────────────┘
  Base: relative, flex, items-center, w-full
  Underline variant: border-b, border-border
  Pills variant: bg-muted, rounded-lg

┌─────────────────────────────────────────────────────────────────┐
│                Scroll Container Classes                          │
│  (from scrollContainerClasses computed)                         │
└─────────────────────────────────────────────────────────────────┘
  Base: flex, items-center, w-full
  When scrollable:
    - overflow-x-auto
    - scrollbar-none
    - scroll-smooth
    - -webkit-overflow-scrolling-touch
  When not scrollable:
    - gap-4 (underline variant)
    - gap-1 (pills variant)

┌─────────────────────────────────────────────────────────────────┐
│                   Arrow Button Classes                           │
│  (from tabsScrollArrowVariants)                                 │
└─────────────────────────────────────────────────────────────────┘
  Layout:
    - absolute, top-1/2, -translate-y-1/2, z-10
    - left-0 (left arrow) OR right-0 (right arrow)

  Size:
    - w-8, h-8 (32×32px touch target)

  Visual:
    - bg-background
    - border, border-border
    - rounded-md
    - shadow-sm
    - text-muted-foreground, text-base

  Interactions:
    - hover:bg-muted/50, hover:text-foreground
    - active:scale-95
    - transition-all, duration-200

  Accessibility:
    - focus-visible:outline-none
    - focus-visible:ring-2
    - focus-visible:ring-ring
    - focus-visible:ring-offset-2

  Disabled:
    - disabled:opacity-30
    - disabled:cursor-not-allowed
    - disabled:hover:bg-background
```

## Template Rendering Logic

```typescript
Template flow:

@if (lmScrollable() && showArrows()) {
  // Left arrow button
  <button
    [class]="leftArrowClasses()"
    [disabled]="!showLeftArrow()"
    (click)="scrollPrevious()">
    ‹
  </button>
}

// Always rendered scroll container
<div
  #scrollContainer
  [class]="scrollContainerClasses()"
  (scroll)="onScroll()"
  (wheel)="onWheel($event)">
  <ng-content /> // Tab triggers projected here
</div>

@if (lmScrollable() && showArrows()) {
  // Right arrow button
  <button
    [class]="rightArrowClasses()"
    [disabled]="!showRightArrow()"
    (click)="scrollNext()">
    ›
  </button>
}
```

## ResizeObserver Pattern

```typescript
// Setup in ngAfterViewInit
resizeObserver = new ResizeObserver(() => {
  this.updateArrowsVisibility();
});

// Observe container
resizeObserver.observe(container);

// Observe all children (tabs)
Array.from(container.children).forEach(child => {
  resizeObserver.observe(child);
});

// Cleanup in ngOnDestroy
resizeObserver.disconnect();
```

**Why observe children?**
- Detects when tabs are dynamically added/removed
- Detects when tab content changes size
- Handles lazy-loaded images or async content

## Edge Case Handling

### 1. No Overflow
```
Container: 600px
Content: 400px

Result:
- showArrows.set(false)
- Arrows not rendered
- Normal flex layout
```

### 2. Single Wide Tab
```
Container: 600px
Content: 800px (single tab)

Result:
- showArrows.set(true)
- Arrows work to scroll partial tab
- User can still see full tab by scrolling
```

### 3. Dynamic Content
```
Initial: 3 tabs (no overflow)
After mount: 5 tabs added (overflow)

ResizeObserver fires → updateArrowsVisibility()
→ showArrows.set(true)
→ Arrows appear automatically
```

### 4. SSR (Server-Side Rendering)
```typescript
if (!isPlatformBrowser(this.platformId)) {
  return; // Skip ResizeObserver setup
}

// Browser-only code continues...
```

Result: No errors on server, fully functional on client.

### 5. RTL (Right-to-Left) Languages
```
Browser handles automatically:
- scrollLeft behavior inverts
- scrollBy() direction inverts
- No code changes needed
```

## Performance Characteristics

### Memory
- **ResizeObserver:** ~1KB per instance
- **Signals:** ~100 bytes per signal × 3 = 300 bytes
- **Event listeners:** 1 scroll listener per component
- **Total:** ~2KB overhead per scrollable tabs component

### CPU
- **ResizeObserver callback:** <1ms per resize
- **updateArrowsVisibility():** <1ms per call
- **Scroll event:** Throttled by browser (~60fps)
- **Total:** Negligible impact

### Rendering
- **Arrow buttons:** Only render when overflow
- **Smooth scroll:** Native browser animation
- **No forced reflows:** All reads before writes

## Accessibility Tree

```
┌─ div (role="tablist")
│  ├─ button (role="button", aria-label="Scroll to previous tabs")
│  │  └─ text: "‹"
│  ├─ div (scroll container)
│  │  ├─ button (role="tab", aria-selected="true")
│  │  │  └─ text: "Tab 1"
│  │  ├─ button (role="tab", aria-selected="false")
│  │  │  └─ text: "Tab 2"
│  │  └─ button (role="tab", aria-selected="false")
│  │     └─ text: "Tab 3"
│  └─ button (role="button", aria-label="Scroll to next tabs")
│     └─ text: "›"
```

**Screen reader announces:**
- "Scroll to previous tabs, button, disabled" (when at start)
- "Scroll to next tabs, button" (when can scroll)
- "Tab 1, tab, selected, 1 of 3" (when focused)
