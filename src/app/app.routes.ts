import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
];
