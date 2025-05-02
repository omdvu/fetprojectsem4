import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {

  constructor() { }

  add(product:any,prodqty:number){
    let cartArr = [];
    let userCart = sessionStorage.getItem('userCart');
    let cartObj = undefined;
    let flag = false;

    const qtyToAdd = +prodqty;

    if (userCart) {
      cartArr = JSON.parse(userCart);

      for (let prod of cartArr) {
        if (prod.id === product.id) {
          flag = true;
          cartObj = prod;
          break;
        }
      }

      if (flag) {
        cartObj.qty += qtyToAdd;
      } else {
        product.qty = qtyToAdd;
        cartArr.push(product);
      }
    } else {
      product.qty = qtyToAdd;
      cartArr.push(product);
    }

    sessionStorage.setItem('userCart', JSON.stringify(cartArr));
  }
}
