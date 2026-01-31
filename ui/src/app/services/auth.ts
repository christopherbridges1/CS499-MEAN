// ui/src/app/services/auth.ts
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerAuth } from './customer-auth';

export type AuthUser = {
  id: string;
  username: string;
  role: 'admin' | 'customer';
};

type LoginResponse = {
  ok: boolean;
  token: string;
  user: AuthUser;
  error?: string;
};

@Injectable({ providedIn: 'root' })
export class Auth {
  private tokenKey = 'authToken';
  private userKey = 'authUser';

  user = signal<AuthUser | null>(this.loadUser());

  constructor(
    private router: Router,
    private customerAuth: CustomerAuth
  ) {}

  private loadUser(): AuthUser | null {
    const raw = localStorage.getItem(this.userKey);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.user();
  }

  isAdmin(): boolean {
    return this.user()?.role === 'admin';
  }

  private clearLegacyKeys() {
    localStorage.removeItem('customerToken');
    localStorage.removeItem('customerUser');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  }

  async register(username: string, password: string): Promise<void> {
  const res = await fetch('/api/customers/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = (await res.json().catch(() => null));
  if (!res.ok || !data?.ok) {
    throw new Error(data?.error || `Registration failed (${res.status})`);
  }
  }
  async login(username: string, password: string): Promise<void> {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = (await res.json().catch(() => null)) as LoginResponse | null;

    if (!res.ok || !data?.ok || !data.token || !data.user) {
      throw new Error(data?.error || `Login failed (${res.status})`);
    }

    // Store unified keys
    localStorage.setItem(this.tokenKey, data.token);
    localStorage.setItem(this.userKey, JSON.stringify(data.user));
    this.user.set(data.user);

    // Keep legacy keys in sync for existing customer UI/favorites
    this.clearLegacyKeys();

    if (data.user.role === 'customer') {
      localStorage.setItem('customerToken', data.token);
      localStorage.setItem(
        'customerUser',
        JSON.stringify({ id: data.user.id, username: data.user.username })
      );

      // update CustomerAuth signal immediately
      this.customerAuth.syncFromStorage();

      this.router.navigate(['/']);
      return;
    }

    // Admin
    localStorage.setItem('adminToken', data.token);
    localStorage.setItem(
      'adminUser',
      JSON.stringify({ id: data.user.id, username: data.user.username })
    );

    this.router.navigate(['/admin']);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.clearLegacyKeys();
    this.user.set(null);

    // keep customer UI consistent if it’s being displayed
    this.customerAuth.syncFromStorage();

    this.router.navigate(['/']);
  }
}
