import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ww-app';
  numberValue = 3;
  result?:number;
  startTime?:Date;
  endTime?:Date;
  uiBlockedFor?:number;

  // onClick(num: number){
  //   this.startTime = new Date();
  //   this.result = this.findNthPrime(num);
  //   this.endTime = new Date();
  //   this.uiBlockedFor = this.endTime.valueOf()- this.startTime.valueOf();
  // }

  // findNthPrime(num: number){ 
  //   let i, primes = [2,3], n=5;
  //   const isPrime = (n:number) =>{
  //     let i=1, p=primes[i],
  //     limit = Math.ceil(Math.sqrt(n));
  //     while(p<=limit){
  //       if(n % p===0){
  //         return false; 
  //       }
  //       i += 1;
  //       p = primes[i];
  //     }
  //     return true;
  //   }
  //   for (i=2; i<=num; i+=1){
  //     while (!isPrime(n)){
  //       n +=2;
  //     }
  //     primes.push(n);
  //     n += 2;
  //   }
  //  return primes[num - 1];
  // }

  onClick(num: number){
    this.startTime = new Date();
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(new URL('./app.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        this.result = data.prime;
      };
      worker.postMessage({num});
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
    this.endTime = new Date();
    this.uiBlockedFor = this.endTime.valueOf()- this.startTime.valueOf();
  }
 }

// if (typeof Worker !== 'undefined') {
//   // Create a new
//   const worker = new Worker(new URL('./app.worker', import.meta.url));
//   worker.onmessage = ({ data }) => {
//     console.log(`page got message: ${data}`);
//   };
//   worker.postMessage('hello');
// } else {
//   // Web Workers are not supported in this environment.
//   // You should add a fallback so that your program still executes correctly.
// }