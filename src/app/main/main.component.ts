import { Component } from '@angular/core';
import { TournamentCardComponent } from "../tournament-card/tournament-card.component";
import { ButtonModule } from 'primeng/button';
import { InfoCardComponent } from "../info-card/info-card.component";
import { ThemeTogglerComponent } from "../theme-toggler/button/theme-toggler.component";
import { EventsDataService } from '../data-services/events/events-data.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { NgOptimizedImage } from '@angular/common';
import { FullImageUrlPipe } from '../common/pipes/full-image-url.pipe';
import { SliderModule } from 'primeng/slider';
import { CoinComponent } from "../icons/coin/coin.component";
import { InputNumberModule } from 'primeng/inputnumber';
import { ChipModule } from 'primeng/chip';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BrawlersDataService } from '../data-services/brawlers/brawlers-data.service';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

interface AutoCompleteSelectEvent {
  originalEvent: Event;
  value: any;
}

interface Filters {
  costRange: [number, number] | undefined;
  eventId: number | undefined;
  playersNumberFrom: number | undefined;
  playersNumberTo: number | undefined;
  bannedBrawlers: any[];
}

const defaultFilters: Filters = {
  costRange: [0, 1000],
  playersNumberFrom: undefined,
  playersNumberTo: undefined,
  eventId: undefined,
  bannedBrawlers: [],
}

@Component({
  selector: 'app-main',
  imports: [
    TournamentCardComponent,
    ButtonModule,
    InfoCardComponent,
    ThemeTogglerComponent,
    FormsModule,
    SelectModule,
    NgOptimizedImage,
    FullImageUrlPipe,
    ReactiveFormsModule,
    SliderModule,
    CoinComponent,
    InputNumberModule,
    ChipModule,
    AutoCompleteModule,
    OverlayBadgeModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  showFilters: boolean = false;
  appliedFilteres: Filters = { ...defaultFilters };
  
  filtersForm: FormGroup = new FormGroup({
    costRange: new FormControl<[number, number]>([0, 1000]),
    playersNumberFrom: new FormControl<number | undefined>(undefined, [Validators.min(0)]),
    playersNumberTo: new FormControl<number | undefined>(undefined, [Validators.min(0), Validators.max(10)]),
    eventId: new FormControl<number | undefined>(undefined),
    bannedBrawlers: new FormControl<any[]>([]),
    brawlerSearchString: new FormControl<string>(''),
  });

  suggestedBrawlers: any[] = [];

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

  get bannedBrawlers(): any[] {
    return this.filtersForm.get('bannedBrawlers')?.value as any[];
  }

  addBannedBrawler(event: AutoCompleteSelectEvent): void {
    this.clearBrawlerSearchString();
    this.bannedBrawlers.push(event.value);
  }

  removeBannedBrawler(id: number): void {
    this.filtersForm.get('bannedBrawlers')?.setValue(
      this.bannedBrawlers.filter((brawler) => brawler.id !== id)
    );
  }

  clearBrawlerSearchString(): void {
    this.filtersForm.get('brawlerSearchString')?.setValue('');
  }

  isSubstring(search: string, target: string): boolean {
    // Normalize strings by removing non-alphanumeric characters, spaces, and converting to lowercase
    const normalize = (str: string) => str.replace(/[^\p{L}\p{N}]/gu, '').toLowerCase();
  
    const normalizedSearch = normalize(search);
    const normalizedTarget = normalize(target);
  
    return normalizedTarget.includes(normalizedSearch);
  }
  searchBrawlers(event: AutoCompleteCompleteEvent){
    if(event.query){
      let newSuggestions: any[] = [];

      for(const brawler of this.brawlersDataService.data){
        if(this.bannedBrawlers.includes(brawler)) continue;
        for(const name of Object.values(brawler.names)){
          if(this.isSubstring(event.query, name as string)){
            newSuggestions.push(brawler);
            break;
          }
        }
        if(newSuggestions.length === 3) break;
      }
      this.suggestedBrawlers = newSuggestions;
    }
    else{
      this.suggestedBrawlers = this.brawlersDataService.data.slice(0, 3);
    }
  }

  resetFilters(): void {
    this.filtersForm.reset(defaultFilters);
  }

  revertFilters(): void {
    this.filtersForm.reset(this.appliedFilteres);
  }

  submitFilters(): void {
    if(this.filtersForm.valid){
      this.appliedFilteres = {
        ...this.filtersForm.value,
        brawlerSearchString: undefined,
      };
      // Handle the filters as needed
      this.showFilters = false;
    }
  }
}
