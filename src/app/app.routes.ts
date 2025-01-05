import { Routes } from '@angular/router';
import { LoginFormComponent } from './auth/login/login.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'login',
    component: LoginFormComponent
  },
];
