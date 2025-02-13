import { Routes } from '@angular/router';
import { HomePageComponent } from './features/landing/pages/home-page.component';
import { SignupPageComponent } from './features/auth/pages/signup-page/signup-page.component';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page.component';
import { TodoListPageComponent } from './features/todo-list/pages/todo-list-page.component';
import { authGuard } from './features/auth/guards/auth.guard';
import { loginGuard } from './features/auth/guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    component: HomePageComponent,
    title: 'TodoList App - Commencez à cocher',
  },
  {
    path: 'home',
    component: TodoListPageComponent,
    title: 'TodoList App',
    canActivate: [loginGuard],
  },
  {
    path: 'signup',
    component: SignupPageComponent,
    title: 'TodoList App',
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginPageComponent,
    title: 'TodoList App',
    canActivate: [authGuard],
  },
];
