import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AppService } from './common/app-service/app.service';
import { catchError, concatMap, throwError } from 'rxjs';
import { LocalStorageService } from './common/local-storage/local-storage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'brawl-tournaments-frontend';
  
  constructor(
    private readonly appService: AppService,
    private readonly localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.appService
    .fetchSettings();
  }
}
