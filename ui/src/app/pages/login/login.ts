import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username = '';
  password = '';
  error = signal<string>('');

  constructor(private auth: Auth, private router: Router) {}

  async submit() {
    this.error.set('');

    const ok = await this.auth.login(this.username, this.password);
    if (!ok) {
      this.error.set('Please enter a username and password.');
      return;
    }

    this.router.navigate(['/admin/animals']);
  }
}