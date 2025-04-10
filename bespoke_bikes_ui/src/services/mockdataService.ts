import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators'; // Importing the required operators
import { SalesPerson } from '../models/salesperson';
import { Product } from '../models/product';
import { Customer } from '../models/customer';
import { Sale } from '../models/sale';
import { Discount } from '../models/discount';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor() { }

  // Mock Salesperson data
  getMockSalesperson(): Observable<SalesPerson> {
    const salesperson: SalesPerson = {
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St, Springfield',
      phone: '555-1234',
      startDate: new Date('2020-01-15'),
      terminationDate: new Date('2023-01-15'),
      manager: 'Jane Smith'
    };
    return of(salesperson);
  }

  // Mock Customer data
  getMockCustomer(): Observable<Customer> {
    const customer: Customer = {
      firstName: 'Alice',
      lastName: 'Johnson',
      address: '456 Oak St, Springfield',
      phone: '555-5678',
      startDate: new Date('2021-06-01')
    };
    return of(customer);
  }

  // Mock Product data
  getMockProduct(): Observable<Product> {
    const mockData: Product = {
      id: 1,
      name: 'Smartwatch',
      manufacturer: 'Apple',
      style: 'Series 7',
      purchasePrice: 400,
      salePrice: 500,
      qtyOnHand: 150,
      commissionPercentage: 7,
    };
    return of(mockData); // Return the mock data wrapped in an Observable
  }



  // Mock Sales data
  getMockSales(): Observable<Sale> {
    return this.getMockProduct().pipe(
      switchMap(product =>
        this.getMockSalesperson().pipe(
          switchMap(salesperson =>
            this.getMockCustomer().pipe(
              map(customer => ({
                product,
                salesperson,
                customer,
                saleDate: new Date()
              }))
            )
          )
        )
      )
    );
  }

  // Mock Discount data
  getMockDiscount(): Observable<Discount> {
    return this.getMockProduct().pipe(
      map(product => ({
        product,
        beginDate: new Date('2025-01-01'),
        endDate: new Date('2025-02-01'),
        discountPercentage: 10
      }))
    );
  }

  getMockObservableSalesPersonList(): Observable<SalesPerson[]> {
    return of(this.getMockSalespersonList());
  }

  // Mock Salesperson list
  getMockSalespersonList(): SalesPerson[] {
    const salespeople: SalesPerson[] = [
      { firstName: 'John', lastName: 'Doe', startDate: new Date('2020-01-15') },
      { firstName: 'Jane', lastName: 'Smith', startDate: new Date('2021-05-10'), terminationDate: new Date('2023-05-10') },
      { firstName: 'Bob', lastName: 'Brown', startDate: new Date('2022-08-20') }
    ];
    return salespeople;
  }

  // Mock Customer list
  getMockCustomerList(): Customer[] {
    const customers: Customer[] = [
      { firstName: 'Alice', lastName: 'Johnson', startDate: new Date('2021-06-01') },
      { firstName: 'Charlie', lastName: 'Davis', startDate: new Date('2023-02-15') },
      { firstName: 'Eve', lastName: 'Martin', startDate: new Date('2022-03-30') }
    ];
    return customers;
  }

  getMockObservableCustomerList(): Observable<Customer[]> {
    const customers: Customer[] = [
      { firstName: 'Alice', lastName: 'Johnson', startDate: new Date('2021-06-01') },
      { firstName: 'Charlie', lastName: 'Davis', startDate: new Date('2023-02-15') },
      { firstName: 'Eve', lastName: 'Martin', startDate: new Date('2022-03-30') }
    ];
    return of(customers);
  }

  // Mock Sales list
  getMockObservableSalesList(): Observable<Sale[]> {
    return this.getMockProduct().pipe(
      switchMap(product =>
        this.getMockObservableSalesPersonList().pipe(
          switchMap(salespeople =>
            this.getMockObservableCustomerList().pipe(
              map(customers => customers.map(customer => ({
                product,
                salesperson: salespeople[Math.floor(Math.random() * salespeople.length)],
                customer,
                saleDate: new Date()
              })))
            )
          )
        )
      )
    );
  }

  // Mock Discount list
  getMockDiscountList(): Observable<Discount[]> {
    return this.getMockProduct().pipe(
      map(product => [
        { product, beginDate: new Date('2025-01-01'), discountPercentage: 10 },
        { product, beginDate: new Date('2025-03-01'), endDate: new Date('2025-04-01'), discountPercentage: 15 }
      ])
    );
  }

  // Method to return a list of mock data
  getMockProducts(): Observable<Product[]> {
    const mockDataList: Product[] = [
      {
        id: 1,
        name: 'Smartphone',
        manufacturer: 'Samsung',
        style: 'Galaxy S21',
        purchasePrice: 800,
        salePrice: 1000,
        qtyOnHand: 200,
        commissionPercentage: 6,
      },
      {
        id: 2,
        name: 'Laptop',
        manufacturer: 'Dell',
        style: 'XPS 13',
        purchasePrice: 1000,
        salePrice: 1200,
        qtyOnHand: 50,
        commissionPercentage: 5,
      },
      {
        id: 3,
        name: 'Smartwatch',
        manufacturer: 'Apple',
        style: 'Series 7',
        purchasePrice: 400,
        salePrice: 500,
        qtyOnHand: 150,
        commissionPercentage: 7,
      },
      {
        id: 4,
        name: '4Smartphone',
        manufacturer: 'Samsung',
        style: 'Galaxy S21',
        purchasePrice: 800,
        salePrice: 1000,
        qtyOnHand: 200,
        commissionPercentage: 6,
      },
      {
        id: 5,
        name: '5Laptop',
        manufacturer: 'Dell',
        style: 'XPS 13',
        purchasePrice: 1000,
        salePrice: 1200,
        qtyOnHand: 50,
        commissionPercentage: 5,
      },
      {
        id: 6,
        name: '6Smartwatch',
        manufacturer: 'Apple',
        style: 'Series 7',
        purchasePrice: 400,
        salePrice: 500,
        qtyOnHand: 150,
        commissionPercentage: 7,
      }
    ];
    return of(mockDataList); // Return the mock list wrapped in an Observable
  }
}