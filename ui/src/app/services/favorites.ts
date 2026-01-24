import { Injectable } from '@angular/core';
import { CustomerAuth } from './customer-auth';

@Injectable({ providedIn: 'root' })
export class Favorites {
  constructor(private auth: CustomerAuth) {}

  private key(): string {
    const u = this.auth.user();
    return u ? `favorites:${u.id}` : `favorites:guest`;
  }

  private readSet(): Set<string> {
    const raw = localStorage.getItem(this.key());
    const arr = raw ? (JSON.parse(raw) as string[]) : [];
    return new Set(arr);
  }

  private writeSet(set: Set<string>) {
    localStorage.setItem(this.key(), JSON.stringify(Array.from(set)));
  }

  list(): string[] {
    return Array.from(this.readSet());
  }

  has(animalId: string): boolean {
    return this.readSet().has(animalId);
  }

  toggle(animalId: string): boolean {
    const set = this.readSet();
    if (set.has(animalId)) set.delete(animalId);
    else set.add(animalId);
    this.writeSet(set);
    return set.has(animalId);
  }

  count(): number {
    return this.readSet().size;
  }

  clear() {
    this.writeSet(new Set());
  }
}