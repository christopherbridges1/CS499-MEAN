import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html'
})
export class Login {
  username = '';
  password = '';
  error = signal('');

  constructor(private auth: Auth) {}

  async submit() {
    this.error.set('');
    try {
      await this.auth.login(this.username, this.password);
    } catch (e: any) {
      this.error.set(e.message || 'Login failed');
    }
  }
}
