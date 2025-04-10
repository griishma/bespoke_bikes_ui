import { Product } from "./product";

export interface Discount {
  product: Product;
  beginDate: Date;
  endDate?: Date;
  discountPercentage: number;
}