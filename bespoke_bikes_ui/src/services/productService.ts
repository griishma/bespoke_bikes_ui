// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://localhost:7265/api/products';

  constructor(private http: HttpClient) {}

  // Fetch list of products from API
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      catchError((error) => {
        return of([]);
      })
    );
  }

  // Update a product via API
  updateProduct(product: Product): Observable<boolean> {
    return this.http.put(`${this.apiUrl}`, product).pipe(
      map(() => true),
      catchError((error) => {
        console.error('Update failed:', error);
        return of(false);
      })
    );
  }
}
