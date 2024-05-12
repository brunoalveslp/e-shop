import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { CartService } from 'src/app/pages/cart/cart.service';
import { Product } from 'src/app/shared/models/product';
import { Size } from 'src/app/shared/models/size';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product?: Product;
  @Input() sizes: Size[];
  public quantityInCart = 0;
  size: Size;
  quantity: number = 0;
  activeIndex: number = -1;




  constructor(private cartService: CartService){}
  ngOnInit(): void {
    this.product?.productSizes.forEach(p => {
        let size = this.sizes.find(s => s.id == p.sizeId)
        if(size){
          p.size = size;
        }
    });

    this.loadProduct();
  }



  loadProduct() {
    const id = this.product?.id;
    if (!id) return;

    this.cartService.cartSource$.pipe(take(1)).subscribe({
      next: cart => {
        const item = cart?.items.find(p => p.id === +id);
        if (item) {
          this.quantity = item.quantity;
          this.size = item.size;
          this.quantityInCart = item.quantity;
        }
      },
      error: error => console.log(error)
    });
  }



  updateCart() {
    if (this.product) {
      let productSize = this.product.productSizes.find(s => s.sizeId == this.activeIndex)?.size;

      if (this.quantity > this.quantityInCart && productSize) {
        const itemsToAdd = this.quantity - this.quantityInCart;
        this.quantityInCart += itemsToAdd;
        this.cartService.addItemToCart(this.product, itemsToAdd, productSize);
      } else if(productSize){
        const itemsToRemove = this.quantityInCart - this.quantity;
        this.quantityInCart -= itemsToRemove;
        this.cartService.removeItemFromCart(this.product.id, itemsToRemove, productSize);
      }
    }
  }

  setActive(index: number) {
    this.activeIndex = index;

    this.cartService.cartSource$.pipe(take(1)).subscribe({
      next: cart => {
        const item = cart?.items.find(p => p.id === this.product?.id && p.size.id === index);
        if (item) {
          this.quantityInCart = item.quantity;
          this.quantity = item.quantity;
        } else {
          this.quantityInCart = 0;
          this.quantity = 1;
        }
      }
    });
  }

  incrementQuantity(){
    let productQuantity = this.product?.productSizes.find(s => s.sizeId == this.activeIndex)?.quantity

    if(this.activeIndex != -1 && productQuantity && this.quantity < productQuantity){
      this.quantity+=1
    }
  }

  decrementQuantity(){
    if(this.quantity > 0 && this.quantity-1 > 0){
      this.quantity -= 1
    }
  }
}
