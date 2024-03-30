import { Component } from '@angular/core';
import { CartService } from './cart.service';
import { CartItem } from '../../shared/models/cart';
import { Size } from 'src/app/shared/models/size';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  constructor(public cartService: CartService){}

  incrementQuantity(item: CartItem){
    this.cartService.addItemToCart(item, item.quantity, item.size);
  }

  removeItem(id: number, quantity: number, size: Size){
    this.cartService.removeItemFromCart(id,quantity, size);
  }
}
