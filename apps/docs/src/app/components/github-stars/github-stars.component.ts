import { Component, inject, OnInit } from '@angular/core';
import { GitHubService } from '../../services/github.service';

@Component({
  selector: 'app-github-stars',
  templateUrl: './github-stars.component.html',
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class GitHubStarsComponent implements OnInit {
  readonly github = inject(GitHubService);

  ngOnInit() {
    this.github.fetchStars();
  }
}
