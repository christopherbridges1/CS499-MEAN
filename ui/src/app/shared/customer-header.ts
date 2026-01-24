import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CustomerAuth } from '../services/customer-auth';
import { Favorites } from '../services/favorites';

@Component({
  selector: 'app-customer-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './customer-header.html',
  styleUrls: ['./customer-header.css']
})
export class CustomerHeader {
  constructor(public auth: CustomerAuth, public fav: Favorites) {}
}