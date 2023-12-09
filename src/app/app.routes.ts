import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/login/login-page.component';

export const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginPageComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'auth/login',
  },
];
