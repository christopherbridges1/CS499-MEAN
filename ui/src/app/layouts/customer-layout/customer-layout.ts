import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomerHeader } from '../../shared/customer-header';

@Component({
  selector: 'app-customer-layout',
  standalone: true,
  imports: [RouterOutlet, CustomerHeader],
  templateUrl: './customer-layout.html',
  styleUrls: ['./customer-layout.css']
})
export class CustomerLayout {}