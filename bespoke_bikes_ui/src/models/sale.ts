import { Product } from "./product";
import { SalesPerson } from "./salesperson";
import { Customer } from "./customer";

export interface Sale {
    product: Product;
    salesperson: SalesPerson;
    customer: Customer;
    saleDate: Date;
}