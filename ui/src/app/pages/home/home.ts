import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomerAuth } from '../../services/customer-auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
constructor(public auth: CustomerAuth) {}
}