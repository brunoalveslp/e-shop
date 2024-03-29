import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsComponent } from './products/products.component';


@NgModule({
  declarations: [
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ProductsComponent,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
