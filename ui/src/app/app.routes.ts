import { Routes } from '@angular/router';
import { Animals } from './pages/animals/animals';
import { Login } from './pages/login/login';
import { authGuard } from './services/auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'animals', component: Animals, canActivate: [authGuard] },
  { path: '', redirectTo: 'animals', pathMatch: 'full' },
  { path: '**', redirectTo: 'animals' }
];