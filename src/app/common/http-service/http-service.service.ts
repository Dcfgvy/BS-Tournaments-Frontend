import { HttpClient } from "@angular/common/http";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { environment } from "../../../environments/environment";
import { IToken } from "../interfaces/token.interface";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'any'
})
export abstract class HttpService {
  protected apiUrl = environment.apiUrl;

  constructor(
    protected readonly http: HttpClient,
    protected readonly localStorageService: LocalStorageService,
  ) {}

  protected getToken(): Observable<IToken> {
    const token = this.localStorageService.getToken();
  
    // If the token is about to expire, refresh it
    if ((token.expiresAt as number) - 1000 * 60 < new Date().getTime()) {
      return this.http.post<IToken>(
        `${this.apiUrl}/users/refresh`,
        { refreshToken: token.refreshToken }
      );
    }
    
    return of(token);
  }  
}
