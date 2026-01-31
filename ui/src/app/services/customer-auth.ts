// ui/src/app/services/customer-auth.ts
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

// Customer user shape (customer does not need role here)
export type CustomerUser = {
  id: string;
  username: string;
};

@Injectable({ providedIn: 'root' })
export class CustomerAuth {
  private tokenKey = 'customerToken';
  private userKey = 'customerUser';

  // In-memory user state for the customer UI
  user = signal<CustomerUser | null>(this.loadUser());

  constructor(private router: Router) {}

  private loadUser(): CustomerUser | null {
    const raw = localStorage.getItem(this.userKey);
    return raw ? (JSON.parse(raw) as CustomerUser) : null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.user();
  }

  syncFromStorage() {
    const raw = localStorage.getItem(this.userKey);
    this.user.set(raw ? (JSON.parse(raw) as CustomerUser) : null);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.user.set(null);
    this.router.navigate(['/']);
  }
}
