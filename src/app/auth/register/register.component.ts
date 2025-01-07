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
import { LocalStorageService } from '../../common/local-storage/local-storage.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { AppService } from '../../common/app-service/app.service';
import { SliderModule } from 'primeng/slider';
import { TrophyComponent } from "../../icons/trophy/trophy.component";
import { PopoverModule } from 'primeng/popover';
import { InfoCardComponent } from "../../info-card/info-card.component";

@Component({
  selector: 'app-register',
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
    SliderModule,
    TrophyComponent,
    PopoverModule,
    InfoCardComponent
],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  blockSpace: RegExp = /^[^ ]+$/;
  registerForm = new FormGroup({
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
    trophyChange: new FormControl(0, [
      Validators.required,
      Validators.min(-50),
      Validators.max(20),
    ]),
  });
  loading: boolean = false;
  invalidCredentials: boolean = false;
  showTrophyChangeHelpCard: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
    private readonly localStorageService: LocalStorageService,
    private readonly router: Router,
    private readonly appService: AppService,
  ) {}

  ngOnInit(){
    // Subscribe to valueChanges to transform the tag input to uppercase
    this.registerForm.controls.tag.valueChanges.subscribe((value) => {
      if(value){
        const upperValue = value.toUpperCase();
        this.registerForm.controls.tag.setValue(upperValue, { emitEvent: false });
      }
    });
  }

  get trophyChangeValue(): number {
    return this.registerForm.controls.trophyChange.value ?? 0;
  }

  register(): void {
    if(this.registerForm.invalid) return;
    
    const { tag, password, trophyChange } = this.registerForm.value;
    this.loading = true;

    this.authService
    .register({
      tag: '#' + (tag as string),
      password: password as string,
      trophyChange: trophyChange as number,
      language: 'en'
    })
    .pipe(
      concatMap((response) => {
        // let token: IToken = { ...response };
        // token.expiresAt = new Date().getTime() + 1000 * token.expiresIn;
        // this.localStorageService.clear();
        // this.localStorageService.setItem('token', JSON.stringify(token));
        // this.appService.fetchSettings();

        return this.authService.fetchMe();
      }),
      concatMap((account) => {
        this.localStorageService.setItem('account', JSON.stringify(account));

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
        console.error('An error occurred:', error);

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
