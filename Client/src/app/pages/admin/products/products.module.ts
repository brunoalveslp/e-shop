import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsComponent } from './products/products.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    ProductsComponent,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
