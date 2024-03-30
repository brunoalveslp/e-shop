import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSizesRoutingModule } from './product-sizes-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductSizesComponent } from './productSizes/product-sizes.component';


@NgModule({
  declarations: [
    ProductSizesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    ProductSizesComponent,
    ProductSizesRoutingModule
  ]
})
export class ProductSizesModule { }
