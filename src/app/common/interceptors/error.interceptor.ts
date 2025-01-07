import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly router: Router,
    private readonly messageService: MessageService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error instanceof HttpErrorResponse) {
            switch (error.status) {
              case 401:
                this.router.navigateByUrl('/login');
                break;
  
              case 403:
                this.messageService.add({
                  severity: 'error',
                  summary: $localize`Access Denied`,
                  detail: $localize`You do not have permission to access this resource.`,
                  life: 3000,
                });
                break;
  
              case 500:
                this.messageService.add({
                  severity: 'error',
                  summary: $localize`Server Error`,
                  detail: $localize`An unknown error occurred. Please try again later.`,
                  life: 3000,
                });
                break;
            }
          }
          return throwError(() => error);
        })
      )
  }
}