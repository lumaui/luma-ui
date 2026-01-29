import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';

interface GitHubRepoResponse {
  stargazers_count: number;
}

interface CachedStars {
  stars: number;
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class GitHubService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly stars = signal<number | null>(null);
  readonly loading = signal(false);

  private readonly REPO_URL = 'https://api.github.com/repos/lumaui/luma-ui';
  private readonly CACHE_KEY = 'lumo-github-stars';
  private readonly CACHE_DURATION = 1000 * 60 * 60; // 1 hour

  fetchStars(): void {
    if (!this.isBrowser) return;

    // Check cache first
    const cached = this.getCachedStars();
    if (cached !== null) {
      this.stars.set(cached);
      return;
    }

    this.loading.set(true);
    this.http
      .get<GitHubRepoResponse>(this.REPO_URL)
      .pipe(
        tap((response) => {
          this.stars.set(response.stargazers_count);
          this.cacheStars(response.stargazers_count);
          this.loading.set(false);
        }),
        catchError(() => {
          this.loading.set(false);
          return of(null);
        }),
      )
      .subscribe();
  }

  private getCachedStars(): number | null {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (!cached) return null;
      const data: CachedStars = JSON.parse(cached);
      if (Date.now() - data.timestamp > this.CACHE_DURATION) return null;
      return data.stars;
    } catch {
      return null;
    }
  }

  private cacheStars(stars: number): void {
    try {
      const data: CachedStars = { stars, timestamp: Date.now() };
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(data));
    } catch {
      // Ignore storage errors
    }
  }
}
