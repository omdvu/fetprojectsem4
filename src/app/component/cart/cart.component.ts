import { Component } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PrevOrderComponent } from '../prev-order/prev-order.component';

@Component({
  selector: 'app-cart',
  imports: [RouterLink,HttpClientModule,PrevOrderComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor(private http:HttpClient,private router:Router){}

  finalStatus: any = null;

  cartResp:any = sessionStorage.getItem('userCart');
  userCart: any = JSON.parse(this.cartResp);

  currUser:any = sessionStorage.getItem("currUser");
  userData:any = JSON.parse(this.currUser);
  userName:string = this.userData.username.split(' ');
  userOrders:any[] = this.userData.userorders;


  get totalCart(){
    let total = 0;
    for(let i of this.userCart){
      total += i.qty*i.price;
    }
    return total;
  }

  setProd(product:any){
    let final = JSON.stringify(product);
    sessionStorage.setItem('viewProd',final);
  }

  remove(item:any){
    this.userCart.splice(item,1);
    if(this.userCart.length == 0){
      sessionStorage.removeItem('userCart');
      this.userCart = false;
    }
    else{
      let final = JSON.stringify(this.userCart);
      sessionStorage.setItem('userCart',final);
    }
    
    
  }

  buy() {
    this.userData.userorders = [...this.userData.userorders, ...this.userCart];
  
    this.http.patch(`http://localhost:3000/placeorder/${this.userData.id}`, this.userData).subscribe({
      next: (res) => {
        this.finalStatus = "Your order has been placed!";
        
        let final = JSON.stringify(this.userData);
        sessionStorage.setItem('currUser', final);
  
        sessionStorage.removeItem('userCart');
  
        alert("Your order has been placed successfully!");
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.finalStatus = "We faced an issue, please try again later";
      }
    });
  }
  
  
}