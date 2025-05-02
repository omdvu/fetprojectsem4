import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomNumbersService {

  constructor() { }
  generateUniqueRandomNumbers(count:number,max:number,min:number):number[] {
    let numbers = new Set<number>();
    while (numbers.size < count) {
        let randVal = Math.floor(Math.random() * (max - min + 1)) + min;
        numbers.add(randVal);
    }
    return [...numbers];
  }
}
