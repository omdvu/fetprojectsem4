import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }
  
  setCategory(category:string){
    sessionStorage.setItem('getCategory',category);
  }
  getCategory(){
    return sessionStorage.getItem('getCategory');
  }
}
