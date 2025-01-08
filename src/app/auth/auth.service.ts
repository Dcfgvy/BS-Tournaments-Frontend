import { Injectable } from '@angular/core';
import { HttpService } from '../common/http-service/http-service.service';
import { concatMap, Observable, of, switchMap } from 'rxjs';
import { IToken } from '../common/interfaces/token.interface';
import { LocalStorageService } from '../common/local-storage/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../common/app-service/app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService {
  constructor(
    protected override readonly http: HttpClient,
    protected override readonly localStorageService: LocalStorageService,
    private readonly appService: AppService,
  ){
    super(http, localStorageService);
  }

  login(data: {
    tag: string;
    password: string;
  }){
    return this.http.post<IToken>(`${this.apiUrl}/users/login`, data).pipe(
      concatMap((tokenResponse) => {
        const token: IToken = { ...tokenResponse };
        token.expiresAt = new Date().getTime() + 1000 * token.expiresIn;

        this.localStorageService.clear();
        this.localStorageService.setItem('token', JSON.stringify(token));

        this.appService.fetchSettings();

        return this.fetchMe();
      })
    );;
  }

  register(data: {
    tag: string;
    password: string;
    trophyChange: number;
    language: string;
  }){
    return this.http.post(`${this.apiUrl}/users/register`, data);
  }

  fetchMe(): Observable<any> {
    return this.getToken()
    .pipe(
      switchMap((token) =>
        this.http.get(`${this.apiUrl}/users/me`, {
          headers: {
            Authorization: `${token.tokenType} ${token.accessToken}`,
          },
        })
        .pipe(
          concatMap((account) => {
            this.localStorageService.setItem('account', JSON.stringify(account));
            return of(account);
          })
        )
      )
    );
  }
}
