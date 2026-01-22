import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  name: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styles: [`
    :host {
      display: block;
    }

    .active-sidebar {
      color: var(--luma-color-primary);
      background-color: rgba(var(--luma-color-primary), 0.05);
      font-weight: 500;
    }
  `]
})
export class SidebarComponent {
  components: MenuItem[] = [
    { name: 'Card', route: '/components/card' }
  ];

  directives: MenuItem[] = [
    { name: 'Button', route: '/components/button' },
  ];
}
