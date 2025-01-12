import { animate, style, transition, trigger } from '@angular/animations';
import { Component, input, model, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-info-card',
  imports: [
    ButtonModule,
    CardModule,
  ],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss',
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(20px) scale(0.95)', opacity: 0 }), // Start below with reduced scale
        animate('200ms ease-out', style({ transform: 'translateY(0) scale(1)', opacity: 1 })), // Move up and expand
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(20px) scale(0.9)', opacity: 0 })), // Move down and shrink
      ]),
    ]),
  ],
})
export class InfoCardComponent {
  show = model(false);
  footer = input(true);

  cardClosed = output<void>();

  closeCard(){
    this.cardClosed.emit();
    this.show.set(false);
  }
}
