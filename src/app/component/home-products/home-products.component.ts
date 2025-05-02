import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../category.service';
import { RandomNumbersService } from '../../random-numbers.service';
import { AddToCartService } from '../../add-to-cart.service';
import { PrevOrderComponent } from '../prev-order/prev-order.component';

@Component({
  selector: 'app-home-products',
  imports: [HttpClientModule,RouterLink],
  templateUrl: './home-products.component.html',
  styleUrl: './home-products.component.css'
})
export class HomeProductsComponent implements OnInit{
  indexes:any = null

  allProds:any = null;
  constructor(private http: HttpClient,private category:CategoryService,private randomnumbers:RandomNumbersService,private addtocart:AddToCartService) {}
  ngOnInit(): void{
    this.http.get("http://localhost:3000/getprods").subscribe({
      next: (res) => {
        this.allProds = res;
        this.indexes = this.randomnumbers.generateUniqueRandomNumbers(4,this.allProds.length-1,0);
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
  getData(category:string){
    this.category.setCategory(category);
  }
  setProd(product:any){
    sessionStorage.setItem('viewProd',JSON.stringify(product));
  }
  add(product:any){
    this.addtocart.add(product,1);
  }
}
