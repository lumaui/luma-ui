import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle.component';
import { GitHubStarsComponent } from '../github-stars/github-stars.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, ThemeToggleComponent, GitHubStarsComponent],
  templateUrl: './header.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class HeaderComponent {
  mobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.mobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }
}
