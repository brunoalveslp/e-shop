import * as cuid from 'cuid';
import { Size } from './size';

export interface Cart {
  id: string;
  items: CartItem[];
}

export interface CartItem {
  id: number;
  productName: string;
  price: number;
  size: Size
  quantity: number;
  weight: number;
  pictureUrl: string;
  brand: string;
  type: string;
  unit: string;
}

export class Cart implements Cart {
  id = cuid();
  items: CartItem[] = [];
}

export interface CartTotals {
  shipping: number;
  subtotal: number;
  total: number;
}
