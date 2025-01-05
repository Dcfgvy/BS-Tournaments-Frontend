import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';

import { routes } from './app.routes';
import { MyPreset } from './prime-preset';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi, withNoXsrfProtection } from '@angular/common/http';
import { LocalStorageService } from './common/local-storage/local-storage.service';
import { ErrorInterceptor } from './common/interceptors/error.interceptor';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi(),
    ),
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    LocalStorageService,

    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset
      },
      ripple: true,
    }),
  ]
};
