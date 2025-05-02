import { Component } from '@angular/core';
import { RouterLink,Router } from '@angular/router';

@Component({
  selector: 'app-prev-order',
  imports: [RouterLink],
  templateUrl: './prev-order.component.html',
  styleUrl: './prev-order.component.css'
})
export class PrevOrderComponent {
  constructor(private router:Router){}

  currUser:any = sessionStorage.getItem("currUser");
  userData:any = JSON.parse(this.currUser);
  userName:string = this.userData.username.split(' ');
  userOrders:any = this.userData.userorders;

  setProd(product:any){
    sessionStorage.setItem('viewProd',JSON.stringify(product));

    const currentUrl = this.router.url;
    
    this.router.navigateByUrl('/temp', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home/view']);
    });
  }
}
