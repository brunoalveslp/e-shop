import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/pages/cart/cart.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() product?: Product;

  constructor(private cartService: CartService){}

  addItemToBasket(){
    this.product && this.cartService.addItemToCart(this.product);
  }
}
