import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AppService } from './common/app-service/app.service';
import { BottomNavigationComponent } from "./bottom-navigation/bottom-navigation.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, ToastModule, BottomNavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'brawl-tournaments-frontend';
  
  constructor(
    private readonly appService: AppService,
  ) {}

  ngOnInit(): void {
    this.appService.fetchSettings();
    // fetch settings every 15 seconds
    setInterval(() => {
      this.appService.fetchSettings();
    }, 1000 * 15);
  }
}
