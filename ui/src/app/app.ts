import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AnimalService } from './services/animal';
import { Header } from './shared/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cs499-ui');

  protected readonly animals = signal<any[]>([]);
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);

  constructor(private animalService: AnimalService) {}

  loadAnimals() {
    this.loading.set(true);
    this.error.set(null);

    this.animalService.getAnimals().subscribe({
      next: (data) => {
        this.animals.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load animals (check API connection).');
        this.loading.set(false);
        console.error(err);
      }
    });
  }
}
