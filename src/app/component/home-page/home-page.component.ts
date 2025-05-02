import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [NavbarComponent,RouterLink,RouterOutlet],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  
}