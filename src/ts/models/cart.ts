import { Product } from "./product";
export class Cart {
  constructor(public products: Array<Product>, public totalPrice: number) {}
}
