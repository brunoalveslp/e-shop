import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../shared/models/product';
import { DeliveryMethod } from '../../shared/models/deliveryMethod';
import { Cart, CartItem, CartTotals } from '../../shared/models/cart';
import { Size } from 'src/app/shared/models/size';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  baseUrl = environment.apiUrl;
  private cartSource = new BehaviorSubject<Cart | null>(null);
  private cartTotalSource = new BehaviorSubject<CartTotals | null>(null);

  cartSource$ = this.cartSource.asObservable();
  cartTotalSource$ = this.cartTotalSource.asObservable();


  constructor(private http: HttpClient  ) { }

  createPaymentIntent(){
    return this.http.post<Cart>(this.baseUrl+'payment/'+this.getCurrentCartValue()?.id, {})
      .pipe(
        map((cart: Cart) => { this.cartSource.next(cart); })
      )
  }

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

  addItemToCart(item: Product | CartItem, quantity = 1, size: Size){
    // check it its a Product or a Cart item
    if(this.isProduct(item)) item = this.mapProductToCartItem(item, size);

    // gets the current Cart or create one
    const Cart = this.getCurrentCartValue() ?? this.createCart();

    // add an item or insert one
    Cart.items = this.addOrUpdateItem(Cart.items, item, quantity, size);
    // persists it
    this.setCart(Cart);
  }

  removeItemFromCart(id: number, quantity = 1,size: Size){
    const Cart = this.getCurrentCartValue();
    if(!Cart) return;
    console.log(id, quantity, size,' deleted')
    const item = Cart.items.find(p => p.id === id && p.size.id === size.id);
    if(item && item.size.id == size.id){
      item.quantity -= quantity;
      if(item.quantity === 0){
        Cart.items = Cart.items.filter(p => p.size.id !== size.id);
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
    const cart = this.getCurrentCartValue();

    if(cart) {
      cart.shippingPrice = deliveryMethod.price;
      cart.deliveryMethodId = deliveryMethod.id;
      this.setCart(cart);
    }
  }

  private addOrUpdateItem(items: CartItem[], itemToAdd: CartItem, quantity: number, size: Size): CartItem[] {
    const item = items?.find(x => x.id === itemToAdd.id && x.size.id === size.id);
    if(item && item.size.id == size.id){
      item.quantity += quantity;
    } else {
      itemToAdd.quantity = quantity;
      itemToAdd.size = size;
      items?.push(itemToAdd);
    }

    return items;
  }

  private createCart(): Cart {
    const cart = new Cart();
    localStorage.setItem('Cart_id', cart.id);
    return cart;
  }

  private mapProductToCartItem(item: Product, size: Size) : CartItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      size: size,
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
      const total = Cart.shippingPrice + subtotal;

      this.cartTotalSource.next({shipping: Cart.shippingPrice, subtotal, total});
   }

   private isProduct(item: Product | CartItem): item is Product {
      return (item as Product).productBrand !== undefined;
   }

}
