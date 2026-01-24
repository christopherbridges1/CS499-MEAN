import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class Auth {
  
    // Testing
  isLoggedIn = signal<boolean>(localStorage.getItem('isLoggedIn') === 'true');  // Test!!!!

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // Testing                                                  
    if (!username?.trim() || !password?.trim()) return false;   // Test!!!!

    localStorage.setItem('isLoggedIn', 'true');
    this.isLoggedIn.set(true);
    return true;
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }
}