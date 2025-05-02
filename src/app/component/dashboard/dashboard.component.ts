import { Component } from '@angular/core';
import { CategoryService } from '../category.service';
import { RouterLink } from '@angular/router';
import { PrevOrderComponent } from '../prev-order/prev-order.component';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink,PrevOrderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private category:CategoryService){}

  currUser:any = sessionStorage.getItem("currUser");
  userData:any = JSON.parse(this.currUser);
  userName:string = this.userData.username.split(' ');
  userOrders:any = this.userData.userorders;

  getData(category:string){
    this.category.setCategory(category);
  }

  setProd(product:any){
    let final = JSON.stringify(product);
    sessionStorage.setItem('viewProd',final);
  }
}
