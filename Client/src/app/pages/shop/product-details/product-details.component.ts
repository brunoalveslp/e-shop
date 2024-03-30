import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'src/app/shared/components/breadcrumb.service';
import { take } from 'rxjs/operators';
import { CartService } from '../../cart/cart.service';
import { Size } from 'src/app/shared/models/size';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  public product?: Product;
  public sizes: Size[] = []
  public quantity = 1;
  public size: Size;
  public quantityInCart = 0;
  activeIndex: number = -1;

  constructor(private shopService: ShopService,
              private activatedRoute: ActivatedRoute,
              private cartService: CartService,
              private bcService: BreadcrumbService) {}

  ngOnInit(): void {
    this.getSizes();
    this.loadProduct();

  }

  getSizes() {
    this.shopService.getSizes().subscribe({
      next: (response) =>
        (this.sizes = [{ id: 0, name: 'Selecionar...', isActive: true }, ...response.sort((a, b) => a.id - b.id)]),
      error: (error) => console.assert(error),
    });
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.shopService.getProduct(+id).subscribe({
        next: product => {
          this.product = product;
          this.product?.productSizes.forEach(ps => {
            let size = this.sizes.find(s => s.id == ps.sizeId);
            if(size){
              ps.size = size;
            }
          });
          this.bcService.updateDescription(product.name)
          this.cartService.cartSource$.pipe(take(1)).subscribe({
            next: cart => {
              const item = cart?.items.find(p => p.id === +id);
              if (item) {
                this.quantity = item.quantity;
                this.size = item.size;
                this.quantityInCart = item.quantity;
              }
            }
          });
        },
        error: error => console.log(error)
      });
    }
  }

  incrementQuantity() {
    this.quantity++;
    console.log(this.product);
  }

  decrementQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
    }
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
        this.cartService.removeItemFromCart(this.product.id, this.quantity, productSize);
      }
    }
  }

  setActive(index: number) {
    this.activeIndex = index;
  }

  get buttonText() {
    return this.quantityInCart === 0 ? 'Adicionar ao Carrinho' : 'Atualizar Carrinho';
  }
}
