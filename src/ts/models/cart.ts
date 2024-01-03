import { Product } from "./product";
export class Cart {
  constructor(
    public products: Map<String, number>,
    public totalPrice: number
  ) {}
}
