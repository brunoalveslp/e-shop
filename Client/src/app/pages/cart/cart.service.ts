import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../shared/models/product';
import { DeliveryMethod } from '../../shared/models/deliveryMethod';
import { Cart, CartItem, CartTotals } from '../../shared/models/cart';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  baseUrl = environment.apiUrl;
  private cartSource = new BehaviorSubject<Cart | null>(null);
  private cartTotalSource = new BehaviorSubject<CartTotals | null>(null);
  shipping = 0;

  cartSource$ = this.cartSource.asObservable();
  cartTotalSource$ = this.cartTotalSource.asObservable();

//continue tomorrow

  constructor(private http: HttpClient  ) { }

  getCart(id: string){
    return this.http.get<Cart>(this.baseUrl+'cart?id='+id).subscribe({
      next: cart => {
        this.cartSource.next(cart);
        this.calculateTotals();
      }
    });
  }

  setCart(cart: Cart){
    return this.http.post<Cart>(this.baseUrl+'cart', cart).subscribe({
      next: cart => {
        this.cartSource.next(cart);
        this.calculateTotals();
      }
    });
  }

  getCurrentCartValue(){
    return this.cartSource.value;
  }

  addItemToCart(item: Product | CartItem, quantity = 1){
    // check it its a Product or a Cart item
    if(this.isProduct(item)) item = this.mapProductToCartItem(item);

    // gets the current Cart or create one
    const Cart = this.getCurrentCartValue() ?? this.createCart();

    // add an item or insert one
    Cart.items = this.addOrUpdateItem(Cart.items, item, quantity);
    // persists it
    this.setCart(Cart);
  }

  removeItemFromCart(id: number, quantity = 1){
    const Cart = this.getCurrentCartValue();

    if(!Cart) return;

    const item = Cart.items.find(p => p.id === id);

    if(item){
      item.quantity -= quantity;
      if(item.quantity === 0){
        Cart.items = Cart.items.filter(p => p.id !== id);
      }

      if(Cart.items.length > 0){
        this.setCart(Cart);
      } else {
        this.deleteCart(Cart);
      }
    }

  }

  deleteCart(Cart: Cart) {
    return this.http.delete(this.baseUrl+'Cart?id='+Cart.id).subscribe({
      next: () => {
        this.deleteLocalCart();
      }
    });
  }

  deleteLocalCart(){
    this.cartSource.next(null);
    this.cartTotalSource.next(null);
    localStorage.removeItem('Cart_id');
  }

  setShippingPrice(deliveryMethod: DeliveryMethod){
    this.shipping = deliveryMethod.price;
    this.calculateTotals();
  }

  private addOrUpdateItem(items: CartItem[], itemToAdd: CartItem, quantity: number): CartItem[] {
    const item = items?.find(x => x.id === itemToAdd.id);
    if(item){
      item.quantity += quantity;
    } else {
      itemToAdd.quantity = quantity;
      items?.push(itemToAdd);
    }

    return items;
  }

  private createCart(): Cart {
    const cart = new Cart();
    localStorage.setItem('Cart_id', cart.id);
    return cart;
  }

  private mapProductToCartItem(item: Product) : CartItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      quantity: 0,
      weight: item.weight,
      pictureUrl: item.pictureUrl,
      type: item.productType,
      brand: item.productBrand,
      unit: item.productUnit
    }
  }

  private calculateTotals(){
      const Cart = this.getCurrentCartValue();
      if(!Cart) return;
      const subtotal = Cart.items.reduce((prev, current) => (current.price * current.quantity) + prev, 0);
      const total = this.shipping + subtotal;

      this.cartTotalSource.next({shipping: this.shipping, subtotal, total});
   }

   private isProduct(item: Product | CartItem): item is Product {
      return (item as Product).productBrand !== undefined;
   }

}
