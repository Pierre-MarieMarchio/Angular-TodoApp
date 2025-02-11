import { Routes } from '@angular/router';
import { HomePageComponent } from './features/landing/pages/home-page.component';
import { SignupPageComponent } from './features/auth/pages/signup-page/signup-page.component';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'TodoList App - Commencez à cocher',
  },
  { path: 'signup', component: SignupPageComponent, title: 'TodoList App' },
  { path: 'login', component: LoginPageComponent, title: 'TodoList App' },
];
