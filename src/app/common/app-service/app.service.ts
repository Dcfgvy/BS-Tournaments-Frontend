import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http-service.service';
import { concatMap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService extends HttpService {
  fetchSettings(){
    return this.http.get(`${this.apiUrl}/settings/public`)
    .pipe(
      concatMap((response) => {
        this.localStorageService.setItem('settings', JSON.stringify(response));
        return [];
      }),
    )
    .subscribe();
  }
}
