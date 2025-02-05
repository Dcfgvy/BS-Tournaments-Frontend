import { Component } from '@angular/core';
import { TournamentCardComponent } from "../tournament-card/tournament-card.component";
import { ButtonModule } from 'primeng/button';
import { ThemeTogglerComponent } from "../theme-toggler/button/theme-toggler.component";
import { EventsDataService } from '../data-services/events/events-data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChipModule } from 'primeng/chip';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BrawlersDataService } from '../data-services/brawlers/brawlers-data.service';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { defaultFilters, Filters, FiltersComponent } from "./filters/filters.component";

@Component({
  selector: 'app-main',
  imports: [
    TournamentCardComponent,
    ButtonModule,
    ThemeTogglerComponent,
    FormsModule,
    SelectModule,
    ReactiveFormsModule,
    SliderModule,
    InputNumberModule,
    ChipModule,
    AutoCompleteModule,
    OverlayBadgeModule,
    FiltersComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  showFilters: boolean = false;
  appliedFilteres: Filters = { ...defaultFilters };

  constructor(
    public readonly eventsDataService: EventsDataService,
    private readonly brawlersDataService: BrawlersDataService,
  ) {}

  get filtersNumber() {
    let res: number = 0;
    Object.keys(defaultFilters).forEach((filterKey: string) => {
      const defaultFilter = JSON.stringify( (defaultFilters as any)[filterKey] || null );
      const selectedFilter = JSON.stringify( (this.appliedFilteres as any)[filterKey] || null );
      if(defaultFilter != selectedFilter){
        res++;
      }
    });
    return res;
  }
}
