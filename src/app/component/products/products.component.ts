import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [HttpClientModule,RouterLink,RouterOutlet],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  
  
  
}
