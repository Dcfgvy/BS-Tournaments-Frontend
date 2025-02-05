import { Component, model } from '@angular/core';
import { InfoCardComponent } from '../../info-card/info-card.component';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoinComponent } from '../../icons/coin/coin.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { SliderModule } from 'primeng/slider';
import { NgOptimizedImage } from '@angular/common';
import { FullImageUrlPipe } from '../../common/pipes/full-image-url.pipe';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BrawlersDataService } from '../../data-services/brawlers/brawlers-data.service';
import { EventsDataService } from '../../data-services/events/events-data.service';
import { ChipModule } from 'primeng/chip';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

interface AutoCompleteSelectEvent {
  originalEvent: Event;
  value: any;
}

export interface Filters {
  costRange: [number, number] | undefined;
  eventId: number | undefined;
  playersNumberFrom: number | undefined;
  playersNumberTo: number | undefined;
  bannedBrawlers: any[];
}

export const defaultFilters: Filters = {
  costRange: [0, 1000],
  playersNumberFrom: undefined,
  playersNumberTo: undefined,
  eventId: undefined,
  bannedBrawlers: [],
}

@Component({
  selector: 'app-filters',
  imports: [
    InfoCardComponent,
    ButtonModule,
    SelectModule,
    FormsModule,
    ReactiveFormsModule,
    CoinComponent,
    InputNumberModule,
    SliderModule,
    NgOptimizedImage,
    FullImageUrlPipe,
    AutoCompleteModule,
    ChipModule,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  show = model<boolean>(false);
  appliedFilteres = model<Filters>({ ...defaultFilters });

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
    this.filtersForm.reset(this.appliedFilteres());
  }

  submitFilters(): void {
    if(this.filtersForm.valid){
      this.appliedFilteres.set({
        ...this.filtersForm.value,
        brawlerSearchString: undefined,
      });
      // Handle the filters as needed
      this.show.set(false);
    }
  }
}
