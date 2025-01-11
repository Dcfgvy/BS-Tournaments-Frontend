import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FullImageUrlPipe } from '../common/pipes/full-image-url.pipe';
import { CoinComponent } from "../icons/coin/coin.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tournament-card',
  imports: [
    CardModule,
    ButtonModule,
    NgOptimizedImage,
    FullImageUrlPipe,
    CoinComponent,
    RouterLink
],
  templateUrl: './tournament-card.component.html',
  styleUrl: './tournament-card.component.scss'
})
export class TournamentCardComponent {
  tournamentId = input.required<number>();

  eventImgUrl = input.required<string>();
  eventName = input.required<string>();

  mapImgUrl = input.required<string>();
  isMapImgSquare = input(true);

  entryCost = input.required<number>();
  playersNumber = input.required<number>();
  firstPlacePrize = input.required<number>();
  peopleRegistered = input.required<number>();

  get tournamentLink() {
    return `/tournament/${this.tournamentId()}`;
  }
}
