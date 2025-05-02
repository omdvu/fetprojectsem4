import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  get userData() {
    return JSON.parse(sessionStorage.getItem('currUser') || '{}');
  }

  get currAddr(): string {
    return this.userData.useraddr;
  }

  get currCart() {
    return JSON.parse(sessionStorage.getItem('userCart') || '[]');
  }

  get totalQty(): number {
    return this.currCart.reduce((acc: number, item: any) => acc + (item.qty || 0), 0);
  }
}
