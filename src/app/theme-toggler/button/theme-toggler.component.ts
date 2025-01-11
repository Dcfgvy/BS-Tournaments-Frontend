import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ThemeTogglerService } from '../theme-toggler.service';

@Component({
  selector: 'app-theme-toggler',
  imports: [
    ButtonModule
  ],
  templateUrl: './theme-toggler.component.html',
  styleUrl: './theme-toggler.component.scss'
})
export class ThemeTogglerComponent {
  constructor(
    private readonly themeTogglerService: ThemeTogglerService,
  ) {}

  get theme(){
    return this.themeTogglerService.theme;
  }

  /**
   * Toggle theme between system, dark, and light.
   */
  toggleTheme(): void {
    const themes = ['system', 'dark', 'light'];
    const currentIndex = themes.indexOf(this.themeTogglerService.theme);
    this.themeTogglerService.theme = themes[(currentIndex + 1) % themes.length];

    this.themeTogglerService.applyTheme();
  }
}
