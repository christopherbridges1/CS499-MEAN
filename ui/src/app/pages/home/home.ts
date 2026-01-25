import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CustomerAuth } from '../../services/customer-auth';
import { Favorites } from '../../services/favorites';
import { AdminAnimals, Animal } from '../../services/admin-animals';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  favoriteAnimals: Animal[] = [];
  loadingFavorites = false;
  favoritesError = '';

  constructor(
    public auth: CustomerAuth,
    public favorites: Favorites,
    private animals: AdminAnimals
  ) {}

  async ngOnInit() {
    await this.loadFavorites();
  }

  async loadFavorites() {
    this.favoritesError = '';
    const ids = new Set(this.favorites.list());

    // if user has no favorites (or not logged in), show empty state
    if (!this.auth.isLoggedIn() || ids.size === 0) {
      this.favoriteAnimals = [];
      return;
    }

    this.loadingFavorites = true;
    try {
      const all = await this.animals.list();
      this.favoriteAnimals = all.filter(a => ids.has(a._id));
      // Optional: keep a stable order matching the favorites list order
      const order = this.favorites.list();
      this.favoriteAnimals.sort(
        (a, b) => order.indexOf(a._id) - order.indexOf(b._id)
      );
    } catch (e: any) {
      this.favoritesError = e?.message || 'Failed to load favorites';
      this.favoriteAnimals = [];
    } finally {
      this.loadingFavorites = false;
    }
  }
}