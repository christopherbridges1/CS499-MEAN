import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerAuth } from '../../services/customer-auth';
import { Favorites } from '../../services/favorites';

type Dog = {
  id: string;        
  name: string;
  breed: string;
  ageWeeks?: number;
  sex?: string;
  description?: string;
};

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './browse.html',
  styleUrls: ['./browse.css']
})
export class Browse {
  query = signal('');

  dogs = signal<Dog[]>([
    { id: 'buddy-lab', name: 'Buddy', breed: 'Labrador Retriever', ageWeeks: 52, sex: 'Male', description: 'Friendly and great with families.' },
    { id: 'luna-gsd', name: 'Luna', breed: 'German Shepherd', ageWeeks: 64, sex: 'Female', description: 'Smart, loyal, and energetic.' },
    { id: 'max-mix', name: 'Max', breed: 'Mixed', ageWeeks: 40, sex: 'Male', description: 'Calm temperament, easygoing.' },
  ]);

  filtered = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return this.dogs();
    return this.dogs().filter(d => `${d.name} ${d.breed}`.toLowerCase().includes(q));
  });

  constructor(public auth: CustomerAuth, public fav: Favorites) {}

  toggleFavorite(dogId: string) {
    if (!this.auth.isLoggedIn()) {
      // simple UX: sends them to login if they try to favorite
      window.location.href = '/customer/login';
      return;
    }
    this.fav.toggle(dogId);
  }

  isFav(dogId: string): boolean {
    if (!this.auth.isLoggedIn()) return false;
    return this.fav.has(dogId);
  }
}