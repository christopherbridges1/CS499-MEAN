import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-customer-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './customer-login.html',
  styleUrls: ['./customer-login.css']
})
export class CustomerLogin {
  username = '';
  password = '';
  error = signal('');

  constructor(private auth: Auth) { }

  async submit() {
    this.error.set('');

    const u = this.username.trim();
    const p = this.password;

    if (!u || !p?.trim()) {
      this.error.set('Please enter a username and password.');
      return;
    }

    try {
      // Auth.login() already handles redirecting based on role
      await this.auth.login(u, p);
    } catch (e: any) {
      this.error.set(e?.message || 'Invalid username or password.');
    }
  }
}