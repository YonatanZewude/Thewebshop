export interface ShopItem {
    id: number;
    brand: string;
    model: string;
    color: string;
    size: string[];
    price: number;
    image: string;
    quantity: number;
    description: string;
  }
  
 export interface BasketItem {
    id: number;
    item: number;
  }
  