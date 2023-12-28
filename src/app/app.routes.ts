import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/login/login-page.component';
import { AuthService } from './auth/auth.service';
import { HomeComponent } from './console/home/home.component';

export const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginPageComponent,
    providers: [AuthService],
  },
  {
    path: 'console/home',
    component: HomeComponent,
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
