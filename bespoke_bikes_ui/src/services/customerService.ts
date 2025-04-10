// customer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Customer } from '../models/customer';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'https://localhost:7265/api/customers'; // Replace with your REST endpoint

  constructor(private http: HttpClient) {}

  // Fetch list of customers
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl).pipe(
      catchError(() => {
        return of([]);
      })
    );
  }

  // add a customer
  addCustomer(customer: Customer): Observable<boolean> {
    return this.http.post(`${this.apiUrl}`, customer).pipe(
      map(() => true),
      catchError((error) => {
        console.error('Update failed:', error);
        return of(false);
      })
    );
  }
}
