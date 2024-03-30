import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/pages/cart/cart.service';
import { Product } from 'src/app/shared/models/product';
import { ProductSize } from 'src/app/shared/models/productSize';
import { Size } from 'src/app/shared/models/size';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product?: Product;
  @Input() sizes: Size[];
  productSizes: ProductSize[] = [];
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
  }

  addItemToCart(){
    let productSize = this.productSizes.find(s => s.sizeId == this.activeIndex)?.size;
    if(productSize){
      this.product && this.cartService.addItemToCart(this.product, this.quantity, productSize);
    }
  }

  setActive(index: number) {
    if(this.quantity > 0 && this.activeIndex != -1 && this.activeIndex != index){
      this.quantity = 0;
      this.activeIndex = index;
    } else {
      this.activeIndex = index;
    }
  }

  incrementQuantity(){
    let productQuantity = this.product?.productSizes.find(s => s.sizeId == this.activeIndex)?.quantity
    console.log(productQuantity, this.activeIndex)

    if(this.activeIndex != -1 && productQuantity && this.quantity < productQuantity){
      this.quantity+=1
    }
  }

  decrementQuantity(){
    if(this.quantity > 0){
      this.quantity -= 1
    }
  }
}
