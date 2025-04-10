// // discount.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { Discount } from '../models/discount';
// import { catchError } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class DiscountService {
//   private apiUrl = 'http://example.com/api/discounts'; // Replace with your REST endpoint

//   constructor(private http: HttpClient) {}

//   // Fetch discounts for products
//   getDiscounts(): Observable<Discount[]> {
//     return this.http.get<Discount[]>(this.apiUrl).pipe(
//       catchError(() => {
//         return of(this.getMockDiscounts()); // Use mock data in case of error
//       })
//     );
//   }

//   // Mock method for testing
//   private getMockDiscounts(): Discount[] {
//     return [
//       new Discount(
//         new Product('Laptop', 'Dell', 'XPS 13', 1000, 1200, 50, 5),
//         new Date('2025-01-01'),
//         new Date('2025-02-01'),
//         10
//       ),
//     ];
//   }
// }
