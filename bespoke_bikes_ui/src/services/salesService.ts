// sales.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Sale } from '../models/sale';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private apiUrl = 'https://localhost:7265/api/salespersons'; // Replace with your REST endpoint

  constructor(private http: HttpClient) {}

  // //Get list of sales with optional date filtering
  // getSales(startDate?: Date, endDate?: Date): Observable<Sale[]> {
  //   let url = this.apiUrl;
  //   if (startDate && endDate) {
  //     url += `?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
  //   }

  //   return this.http.get<Sale[]>(url).pipe(
  //     catchError(() => {
  //       return of(this.getMockSales()); // Use mock data in case of error
  //     })
  //   );
  // }

  // //Create a new sale
  // createSale(sale: Sales): Observable<Sales> {
  //   return this.http.post<Sales>(this.apiUrl, sale).pipe(
  //     catchError(() => {
  //       return of(sale); // Mock create for testing
  //     })
  //   );
  // }

  // // Generate quarterly commission report for a salesperson
  // getQuarterlyCommissionReport(salespersonId: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/commissions/${salespersonId}`).pipe(
  //     catchError(() => {
  //       return of(this.getMockCommissionReport()); // Mock data for testing
  //     })
  //   );
  // }

}
