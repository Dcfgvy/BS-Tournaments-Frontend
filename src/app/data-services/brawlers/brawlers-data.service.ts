import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../common/local-storage/local-storage.service';
import { HttpService } from '../../common/http-service/http-service.service';
import { DataService } from '../../common/interfaces/data-service';
import { concatMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrawlersDataService extends HttpService implements DataService {
  private _data: any[] = [];

  constructor(
    protected override readonly http: HttpClient,
    protected override readonly localStorageService: LocalStorageService,
  ){
    super(http, localStorageService);
    this.fetchData();
  }

  get data(){
    return this._data;
  }

  fetchData(): void {
    this.http.get<any[]>(`${this.apiUrl}/brawlers/active`)
    .pipe(
      concatMap((data) => {
        this._data = data;
        return [];
      })
    )
    .subscribe();
  };
}
