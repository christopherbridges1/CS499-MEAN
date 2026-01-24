import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

type Animal = {
  name: string;
  breed: string;
  outcome: string;
  lat?: number;
  lon?: number;
};

@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animals.html',
  styleUrls: ['./animals.css']
})
export class Animals {
  animals = signal<Animal[]>([
    { name: 'Buddy', breed: 'Labrador Retriever', outcome: 'Adoption', lat: 30.2672, lon: -97.7431 },
    { name: 'Luna', breed: 'German Shepherd', outcome: 'Transfer', lat: 29.7604, lon: -95.3698 },
    { name: 'Max', breed: 'Mixed', outcome: 'Adoption', lat: 32.7767, lon: -96.7970 },
  ]);

  total = computed(() => this.animals().length);
  adopted = computed(() => this.animals().filter(a => a.outcome === 'Adoption').length);
  transfer = computed(() => this.animals().filter(a => a.outcome === 'Transfer').length);

  // ✅ Safe URL for iframe [src]
  mapUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    const a = this.animals()[0];
    const lat = a?.lat ?? 39.8283;
    const lon = a?.lon ?? -98.5795;

    const url =
      `https://www.openstreetmap.org/export/embed.html?bbox=` +
      `${lon - 0.2}%2C${lat - 0.2}%2C${lon + 0.2}%2C${lat + 0.2}` +
      `&layer=mapnik&marker=${lat}%2C${lon}`;

    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}