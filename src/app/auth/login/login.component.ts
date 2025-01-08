import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormWrapperComponent } from '../form-wrapper/form-wrapper.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { KeyFilterModule } from 'primeng/keyfilter';
import { AuthService } from '../auth.service';
import { catchError, concatMap, finalize, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { InfoCardComponent } from "../../info-card/info-card.component";
import { LocalStorageService } from '../../common/local-storage/local-storage.service';

@Component({
  selector: 'app-login',
  imports: [
    FormWrapperComponent,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    RouterLink,
    KeyFilterModule,
    ToastModule,
    InfoCardComponent,
],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  blockSpace: RegExp = /^[^ ]+$/;
  loginForm = new FormGroup({
    tag: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(32),
    ]),
  });
  loading: boolean = false;
  invalidCredentials: boolean = false;
  showForgotPasswordInstructions: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService,
  ) {}

  ngOnInit(){
    // Subscribe to valueChanges to transform the tag input to uppercase
    this.loginForm.controls.tag.valueChanges.subscribe((value) => {
      if(value){
        const upperValue = value.toUpperCase();
        this.loginForm.controls.tag.setValue(upperValue, { emitEvent: false });
      }
    });
  }

  get botUsername(){
    return JSON.parse(this.localStorageService.getItem('settings')!).botUsername;
  }

  login(): void {
    if(this.loginForm.invalid) return;
    
    const { tag, password } = this.loginForm.value;
    this.loading = true;

    this.authService
    .login({
      tag: '#' + (tag as string),
      password: password as string,
    })
    .pipe(
      concatMap(() => {
        this.messageService.add({
          severity: 'success',
          summary: $localize`Signed in`,
          life: 3000,
        });

        this.router.navigateByUrl('/');
        return [];
      }),
      catchError((error) => {
        // this one works after the http interceptor
        if(error instanceof HttpErrorResponse){
          if(error.status == HttpStatusCode.BadRequest){
            this.invalidCredentials = true;
          }
        }
        return throwError(() => error);
      }),
      finalize(() => {
        this.loading = false;
      })
    )
    .subscribe();
  }
}
