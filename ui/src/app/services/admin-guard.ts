// ui/src/app/services/admin-guard.ts
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from './auth';

export const adminGuard = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.isLoggedIn() && auth.isAdmin()) return true;

  router.navigate(['/']);
  return false;
};
