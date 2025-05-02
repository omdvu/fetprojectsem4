import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AddToCartService } from '../../add-to-cart.service';

@Component({
  selector: 'app-product-display',
  imports: [HttpClientModule,RouterLink],
  templateUrl: './product-display.component.html',
  styleUrl: './product-display.component.css'
})

export class ProductDisplayComponent implements OnInit{
  constructor(private http : HttpClient,private addtocart:AddToCartService){}
  data:any = '';
  category:any = sessionStorage.getItem('getCategory');
  categorytheme:string = "rgba(47,120,70,1)";
  ngOnInit(): void {
    this.http.get(`http://localhost:3000/${this.category}`).subscribe({
      next: (res) => {
        this.data = res;
      },
      error: (err) => {
        if(err.status === 400){
          console.log("Oopsies");
        }
        else{
          console.log(err);
        }
      }
    })
  }
  setProd(product:any){
    sessionStorage.setItem('viewProd',JSON.stringify(product));
  }
  add(product:any){
    this.addtocart.add(product,1);
  }
}
