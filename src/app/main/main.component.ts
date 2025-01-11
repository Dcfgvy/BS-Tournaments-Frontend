import { Component } from '@angular/core';
import { TournamentCardComponent } from "../tournament-card/tournament-card.component";
import { ButtonModule } from 'primeng/button';
import { InfoCardComponent } from "../info-card/info-card.component";
import { ThemeTogglerComponent } from "../theme-toggler/button/theme-toggler.component";

@Component({
  selector: 'app-main',
  imports: [
    TournamentCardComponent,
    ButtonModule,
    InfoCardComponent,
    ThemeTogglerComponent
],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  showFilters: boolean = false;
}
