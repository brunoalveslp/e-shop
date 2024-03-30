import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from 'src/app/pages/cart/cart.service';
import { CartItem } from '../models/cart';
import { Size } from '../models/size';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent {
  @Output() addItem = new EventEmitter<CartItem>();
  @Output() removeItem = new EventEmitter<{id: number, quantity: number, size: Size}>();
  @Input() isCart = true;

  constructor(public cartService: CartService){}

  addCartItem(item: CartItem){
    this.addItem.emit(item)
  }

  removeCartItem(id: number, quantity = 1, size: Size){
    this.removeItem.emit({id, quantity, size});
  }
}
