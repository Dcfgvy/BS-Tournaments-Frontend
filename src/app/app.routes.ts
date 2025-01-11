import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './auth/register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

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
  {
    path: 'my-tournaments',
    component: RegisterComponent
  },
  {
    path: 'create-tournament',
    component: RegisterComponent
  },
  {
    path: 'balance',
    component: RegisterComponent
  },
  {
    path: 'settings',
    component: RegisterComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
