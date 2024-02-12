import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountModule } from './account/account.module';
import { CheckoutModule } from './checkout/checkout.module';
import { CartModule } from './cart/cart.module';
import { HomeModule } from './home/home.module';
import { OrdersModule } from './orders/orders.module';
import { ShopModule } from './shop/shop.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountModule,
    CartModule,
    CheckoutModule,
    HomeModule,
    OrdersModule,
    ShopModule
  ],
  exports: [
    AccountModule,
    CartModule,
    CheckoutModule,
    HomeModule,
    OrdersModule,
    ShopModule
  ]
})
export class PagesModule { }
