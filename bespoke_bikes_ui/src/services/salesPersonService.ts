// salesperson.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SalesPerson } from '../models/salesperson';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SalespersonService {
  private apiUrl = 'https://localhost:7265/api/salespersons';

  constructor(private http: HttpClient) {}

  // Get list of salespeople
  getSalespeople(): Observable<SalesPerson[]> {
    return this.http.get<SalesPerson[]>(this.apiUrl).pipe(
      catchError(() => {
        return of([]);
      })
    );
  }

  // Update salesperson details via API
  updateSalesperson(salesperson: SalesPerson): Observable<boolean> {
    return this.http.put(`${this.apiUrl}`, salesperson).pipe(
      map(() => true),
      catchError((error) => {
        console.error('Update failed:', error);
        return of(false);
      })
    );
  }
}
