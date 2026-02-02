---
name: Modal
type: component
selector: luma-modal
category: Feedback
description: HTML-first modal dialog with compositional structure, focus trap, and smooth animations
inputs:
  - name: lmOpen
    type: 'boolean | null'
    default: 'null'
    description: Controlled open state (null for uncontrolled mode)
  - name: lmDefaultOpen
    type: 'boolean'
    default: 'false'
    description: Default open state for uncontrolled mode
  - name: lmSize
    type: "'sm' | 'md' | 'lg' | 'xl' | 'full'"
    default: "'md'"
    description: Modal size variant
  - name: lmCloseOnOverlay
    type: 'boolean'
    default: 'true'
    description: Close when clicking the overlay
  - name: lmCloseOnEscape
    type: 'boolean'
    default: 'true'
    description: Close when pressing Escape key
outputs:
  - name: lmOpenChange
    type: 'EventEmitter<boolean>'
    description: Emits when open state changes
directives:
  - name: ModalOverlayComponent
    selector: 'luma-modal-overlay'
    description: Semi-transparent backdrop that closes modal on click
  - name: ModalContainerComponent
    selector: 'luma-modal-container'
    description: Dialog container with focus trap and ARIA attributes
  - name: ModalHeaderDirective
    selector: '[lumaModalHeader]'
    description: Header section for title and close button
  - name: ModalTitleDirective
    selector: '[lumaModalTitle]'
    description: Modal title with aria-labelledby connection
    inputs:
      - name: lmSize
        type: "'sm' | 'md' | 'lg'"
        default: "'md'"
        description: Title size variant
  - name: ModalContentDirective
    selector: '[lumaModalContent]'
    description: Scrollable content area
    inputs:
      - name: lmScrollable
        type: 'boolean'
        default: 'true'
        description: Enable vertical scrolling
  - name: ModalFooterDirective
    selector: '[lumaModalFooter]'
    description: Footer section for action buttons
    inputs:
      - name: lmAlign
        type: "'start' | 'center' | 'end' | 'between'"
        default: "'end'"
        description: Content alignment
  - name: ModalCloseComponent
    selector: 'luma-modal-close'
    description: Close button with X icon
    inputs:
      - name: lmAriaLabel
        type: 'string'
        default: "'Close modal'"
        description: Accessible label for the close button
tokenGroups:
  - name: Overlay
    tokens:
      - name: --luma-modal-overlay-bg
        value: oklch(0 0 0 / 0.4)
        description: Overlay background (40% opacity for context awareness)
  - name: Container
    tokens:
      - name: --luma-modal-container-bg
        value: '{surface.base}'
        description: Modal background color
      - name: --luma-modal-container-radius
        value: 16px
        description: Modal border radius
      - name: --luma-modal-container-shadow
        value: 0 25px 50px -12px oklch(0 0 0 / 0.25)
        description: Modal shadow
  - name: Header
    tokens:
      - name: --luma-modal-header-padding-x
        value: 24px
        description: Header horizontal padding
      - name: --luma-modal-header-padding-y
        value: 16px
        description: Header vertical padding
      - name: --luma-modal-header-border-color
        value: '{neutral.60}'
        description: Header border color
  - name: Title
    tokens:
      - name: --luma-modal-title-color
        value: '{text.primary}'
        description: Title text color
      - name: --luma-modal-title-font-weight
        value: '600'
        description: Title font weight
  - name: Content
    tokens:
      - name: --luma-modal-content-padding-x
        value: 24px
        description: Content horizontal padding
      - name: --luma-modal-content-padding-y
        value: 20px
        description: Content vertical padding
  - name: Footer
    tokens:
      - name: --luma-modal-footer-padding-x
        value: 24px
        description: Footer horizontal padding
      - name: --luma-modal-footer-padding-y
        value: 16px
        description: Footer vertical padding
      - name: --luma-modal-footer-border-color
        value: '{neutral.60}'
        description: Footer border color
  - name: Close Button
    tokens:
      - name: --luma-modal-close-color
        value: '{text.secondary}'
        description: Close button color
      - name: --luma-modal-close-bg-hover
        value: '{neutral.60}'
        description: Close button hover background
      - name: --luma-modal-close-radius
        value: 6px
        description: Close button border radius
  - name: Transition
    tokens:
      - name: --luma-modal-transition-duration
        value: 200ms
        description: Animation duration
      - name: --luma-modal-transition-timing
        value: cubic-bezier(0.16, 1, 0.3, 1)
        description: Smooth deceleration easing
---

# Modal

## Purpose

Modal provides an HTML-first dialog component for displaying focused content that requires user attention. Unlike service-based modals, this component works directly in templates, giving developers full control over content and actions while maintaining proper accessibility.

## Usage Examples

### Basic Modal

```html
<button lumaButton (click)="isOpen.set(true)">Open Modal</button>

<luma-modal [lmOpen]="isOpen()" (lmOpenChange)="isOpen.set($event)">
  <luma-modal-overlay>
    <luma-modal-container>
      <luma-modal-close />

      <div lumaModalHeader>
        <h2 lumaModalTitle>Modal Title</h2>
      </div>

      <div lumaModalContent>
        <p>Modal content goes here...</p>
      </div>

      <div lumaModalFooter>
        <button lumaButton lmVariant="ghost" (click)="isOpen.set(false)">
          Cancel
        </button>
        <button lumaButton lmVariant="primary" (click)="onConfirm()">
          Confirm
        </button>
      </div>
    </luma-modal-container>
  </luma-modal-overlay>
</luma-modal>
```

### Different Sizes

```html
<!-- Small modal -->
<luma-modal [lmOpen]="isOpen()" lmSize="sm">
  <luma-modal-overlay>
    <luma-modal-container>
      <div lumaModalContent>
        <p>Compact confirmation dialog</p>
      </div>
      <div lumaModalFooter>
        <button lumaButton lmVariant="primary">OK</button>
      </div>
    </luma-modal-container>
  </luma-modal-overlay>
</luma-modal>

<!-- Large modal -->
<luma-modal [lmOpen]="isOpen()" lmSize="lg">
  <luma-modal-overlay>
    <luma-modal-container>
      <div lumaModalHeader>
        <h2 lumaModalTitle lmSize="lg">Large Modal</h2>
        <luma-modal-close />
      </div>
      <div lumaModalContent>
        <p>More space for complex content...</p>
      </div>
    </luma-modal-container>
  </luma-modal-overlay>
</luma-modal>

<!-- Full screen modal -->
<luma-modal [lmOpen]="isOpen()" lmSize="full">
  <luma-modal-overlay>
    <luma-modal-container>
      <div lumaModalHeader>
        <h2 lumaModalTitle>Full Screen</h2>
        <luma-modal-close />
      </div>
      <div lumaModalContent>
        <p>Takes up 95% of the viewport</p>
      </div>
    </luma-modal-container>
  </luma-modal-overlay>
</luma-modal>
```

### Scrollable Content

```html
<luma-modal [lmOpen]="isOpen()" lmSize="lg">
  <luma-modal-overlay>
    <luma-modal-container>
      <div lumaModalHeader>
        <h2 lumaModalTitle>Terms of Service</h2>
        <luma-modal-close />
      </div>

      <div lumaModalContent [lmScrollable]="true">
        <!-- Long content scrolls here, header/footer stay fixed -->
        @for (section of sections; track section.id) {
        <div class="mb-4">
          <h3 class="font-medium">{{ section.title }}</h3>
          <p>{{ section.content }}</p>
        </div>
        }
      </div>

      <div lumaModalFooter lmAlign="between">
        <label class="flex items-center gap-2">
          <input type="checkbox" [(ngModel)]="accepted" />
          I accept the terms
        </label>
        <button lumaButton [disabled]="!accepted" (click)="onAccept()">
          Continue
        </button>
      </div>
    </luma-modal-container>
  </luma-modal-overlay>
</luma-modal>
```

### Uncontrolled Mode

```html
<!-- Use template reference for uncontrolled mode -->
<luma-modal #confirmModal [lmDefaultOpen]="false">
  <luma-modal-overlay>
    <luma-modal-container>
      <div lumaModalContent>
        <p>Are you sure you want to proceed?</p>
      </div>
      <div lumaModalFooter>
        <button lumaButton lmVariant="ghost" (click)="confirmModal.close()">
          No
        </button>
        <button
          lumaButton
          lmVariant="primary"
          (click)="onYes(); confirmModal.close()"
        >
          Yes
        </button>
      </div>
    </luma-modal-container>
  </luma-modal-overlay>
</luma-modal>

<!-- Open from anywhere -->
<button lumaButton (click)="confirmModal.open()">Delete Item</button>
```

### Footer Alignment

```html
<!-- End aligned (default) -->
<div lumaModalFooter>
  <button lumaButton>Action</button>
</div>

<!-- Space between -->
<div lumaModalFooter lmAlign="between">
  <button lumaButton lmVariant="danger">Delete</button>
  <button lumaButton>Save</button>
</div>

<!-- Center aligned -->
<div lumaModalFooter lmAlign="center">
  <button lumaButton>Got it</button>
</div>

<!-- Start aligned -->
<div lumaModalFooter lmAlign="start">
  <button lumaButton>Back</button>
</div>
```

## Accessibility

The Modal component implements the WAI-ARIA Dialog pattern:

- **Roles**: `role="dialog"` and `aria-modal="true"` on the container
- **Label**: `aria-labelledby` automatically connects to the modal title
- **Focus Trap**: Tab key cycles through focusable elements within the modal
- **Focus Restoration**: Focus returns to the trigger element when modal closes
- **Escape Key**: Closes the modal (configurable via `lmCloseOnEscape`)
- **Overlay Click**: Closes the modal (configurable via `lmCloseOnOverlay`)

### Keyboard Navigation

| Key       | Action                                   |
| --------- | ---------------------------------------- |
| Tab       | Move focus to next focusable element     |
| Shift+Tab | Move focus to previous focusable element |
| Escape    | Close the modal                          |

## Neo-Minimal Principles

### Visual Silence

- **40% overlay opacity** maintains context awareness while focusing attention
- Clean, uncluttered structure with clear visual hierarchy
- Subtle borders separate sections without visual noise

### Calm Interactions

- **Scale animation (95% → 100%)** provides subtle, non-jarring entrance
- **cubic-bezier(0.16, 1, 0.3, 1)** creates a "settling into place" feel
- Focus trap prevents disorienting tab-out experience
- 200ms transitions feel responsive but not abrupt

### Functional Whitespace

- Consistent padding creates rhythm across header, content, and footer
- `max-h-[90vh]` ensures modal never exceeds viewport
- Scrollable content area keeps header/footer always visible

## Use Cases

### Lazy Loading

Load data only when the modal opens, saving unnecessary requests.

```typescript
@Component({
  template: `
    <button lumaButton (click)="openUserModal()">View User</button>

    <luma-modal [lmOpen]="isOpen()" (lmOpenChange)="isOpen.set($event)">
      <luma-modal-overlay>
        <luma-modal-container>
          <luma-modal-close />
          <div lumaModalHeader>
            <h2 lumaModalTitle>User Details</h2>
          </div>
          <div lumaModalContent>
            @if (loading()) {
              <div class="flex justify-center py-8">
                <span class="lm-text-secondary">Loading...</span>
              </div>
            } @else if (user()) {
              <div class="space-y-2">
                <p><strong>Name:</strong> {{ user()?.name }}</p>
                <p><strong>Email:</strong> {{ user()?.email }}</p>
              </div>
            }
          </div>
        </luma-modal-container>
      </luma-modal-overlay>
    </luma-modal>
  `,
})
export class UserModalComponent {
  private userService = inject(UserService);

  isOpen = signal(false);
  loading = signal(false);
  user = signal<User | null>(null);

  openUserModal() {
    this.isOpen.set(true);
    this.loading.set(true);

    this.userService
      .getUser(123)
      .pipe(
        tap((user) => this.user.set(user)),
        finalize(() => this.loading.set(false)),
      )
      .subscribe();
  }
}
```

### Save on Close

Execute logic when the modal closes (cleanup, analytics, auto-save).

```typescript
@Component({
  template: `
    <luma-modal [lmOpen]="isOpen()" (lmOpenChange)="handleOpenChange($event)">
      <luma-modal-overlay>
        <luma-modal-container>
          <div lumaModalHeader>
            <h2 lumaModalTitle>Edit Profile</h2>
            <luma-modal-close />
          </div>
          <div lumaModalContent>
            <input [(ngModel)]="formData().name" placeholder="Name" />
            <input [(ngModel)]="formData().email" placeholder="Email" />
          </div>
          <div lumaModalFooter>
            <button lumaButton lmVariant="ghost" (click)="cancel()">
              Cancel
            </button>
            <button lumaButton lmVariant="primary" (click)="save()">
              Save
            </button>
          </div>
        </luma-modal-container>
      </luma-modal-overlay>
    </luma-modal>
  `,
})
export class EditProfileModalComponent {
  isOpen = signal(false);
  formData = signal({ name: '', email: '' });

  handleOpenChange(open: boolean) {
    if (!open) {
      // Modal closing - execute cleanup
      this.formData.set({ name: '', email: '' });
      this.analytics.track('profile_modal_closed');
    }
    this.isOpen.set(open);
  }

  save() {
    this.profileService.update(this.formData());
    this.isOpen.set(false);
  }

  cancel() {
    this.isOpen.set(false);
  }
}
```

### Confirm Before Close

Prevent accidental closing when there are unsaved changes.

```typescript
@Component({
  template: `
    <luma-modal
      [lmOpen]="isOpen()"
      (lmOpenChange)="handleOpenChange($event)"
      [lmCloseOnOverlay]="!hasChanges()"
      [lmCloseOnEscape]="!hasChanges()"
    >
      <luma-modal-overlay>
        <luma-modal-container>
          <div lumaModalHeader>
            <h2 lumaModalTitle>Document</h2>
            <luma-modal-close />
          </div>
          <div lumaModalContent>
            <textarea
              [ngModel]="content()"
              (ngModelChange)="onContentChange($event)"
            ></textarea>
          </div>
          <div lumaModalFooter>
            <button
              lumaButton
              lmVariant="ghost"
              (click)="handleOpenChange(false)"
            >
              Close
            </button>
            <button
              lumaButton
              lmVariant="primary"
              [disabled]="!hasChanges()"
              (click)="save()"
            >
              Save
            </button>
          </div>
        </luma-modal-container>
      </luma-modal-overlay>
    </luma-modal>

    <!-- Confirmation modal -->
    <luma-modal
      [lmOpen]="showConfirm()"
      (lmOpenChange)="showConfirm.set($event)"
    >
      <luma-modal-overlay>
        <luma-modal-container>
          <div lumaModalContent>
            <p>You have unsaved changes. Discard and close?</p>
          </div>
          <div lumaModalFooter>
            <button
              lumaButton
              lmVariant="ghost"
              (click)="showConfirm.set(false)"
            >
              Keep editing
            </button>
            <button lumaButton lmVariant="danger" (click)="discardAndClose()">
              Discard changes
            </button>
          </div>
        </luma-modal-container>
      </luma-modal-overlay>
    </luma-modal>
  `,
})
export class DocumentModalComponent {
  isOpen = signal(false);
  showConfirm = signal(false);
  content = signal('');
  originalContent = signal('');

  hasChanges = computed(() => this.content() !== this.originalContent());

  onContentChange(value: string) {
    this.content.set(value);
  }

  handleOpenChange(open: boolean) {
    if (!open && this.hasChanges()) {
      this.showConfirm.set(true);
      return;
    }
    this.isOpen.set(open);
  }

  discardAndClose() {
    this.showConfirm.set(false);
    this.content.set(this.originalContent());
    this.isOpen.set(false);
  }

  save() {
    this.originalContent.set(this.content());
    this.isOpen.set(false);
  }
}
```
