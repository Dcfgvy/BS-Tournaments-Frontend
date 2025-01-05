import { Injectable } from '@angular/core';
import { HttpService } from '../common/http-service/http-service.service';
import { Observable, switchMap } from 'rxjs';
import { IToken } from '../common/interfaces/token.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService {
  login(data: { tag: string; password: string }){
    return this.http.post<IToken>(`${this.apiUrl}/users/login`, data);
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
      )
    );
  }
}
