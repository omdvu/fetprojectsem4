import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { FormsModule } from '@angular/forms';
import { AddToCartService } from '../../add-to-cart.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RandomNumbersService } from '../../random-numbers.service';
import { Router,ActivatedRoute, RouterLink  } from '@angular/router';
import { PrevOrderComponent } from '../prev-order/prev-order.component';

@Component({
  selector: 'app-product-view',
  imports: [FormsModule,HttpClientModule,PrevOrderComponent,RouterLink],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent implements OnInit{
  
  constructor(private router : Router,private route: ActivatedRoute,private category:CategoryService,private addtocart:AddToCartService,private http:HttpClient,private randomnumbers:RandomNumbersService){}

  
  product:any = null;
  storage:any = null;
  prodqty:number = 1;

  allProds:any = null;
  indexes:any = null;

  currUser:any = sessionStorage.getItem("currUser");
  userData:any = JSON.parse(this.currUser);
  userName:string = this.userData.username.split(' ');
  userOrders:any = this.userData.userorders;

  green:string = "rgba(47,120,70,1)"

  ngOnInit(): void {
    this.storage = sessionStorage.getItem('viewProd');
    this.product = JSON.parse(this.storage);

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

  add(){
    this.addtocart.add(this.product,this.prodqty);
  }
  add2(product:any){
    this.addtocart.add(product,1);
  }

  setProd(product:any){
    sessionStorage.setItem('viewProd',JSON.stringify(product));

    const currentUrl = this.router.url;

    this.router.navigateByUrl('/temp', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
