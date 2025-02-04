import { Injectable } from '@angular/core';
import { LocalStorageService } from '../common/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeTogglerService {
  theme: string = 'dark';

  constructor(
    private readonly localStorageService: LocalStorageService
  ) {
    this.loadTheme();
  }

  /**
   * Load theme from localStorage and apply it.
   */
  private loadTheme(): void {
    const savedTheme = this.localStorageService.getItem('theme');
    this.theme = savedTheme ? savedTheme : this.getSystemMode();
    this.applyTheme();
  }

  /**
   * Apply the theme by updating the HTML class list.
   */
  applyTheme(): void {
    const htmlElement = document.documentElement;

    if(this.theme === 'dark') {
      htmlElement.classList.add('app-dark');
    } else {
      htmlElement.classList.remove('app-dark');
    }

    this.localStorageService.setItem('theme', this.theme);
  }

  /**
   * Detect if the system is in dark mode.
   */
  private getSystemMode(): string {
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
      return 'dark';
    }
    return 'light';
  }
}
