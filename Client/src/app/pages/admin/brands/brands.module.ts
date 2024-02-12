import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrandsComponent } from './brands/brands.component';
import { BrandsRoutingModule } from './brands-routing.module';



@NgModule({
  declarations: [
    BrandsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    BrandsComponent,
    BrandsRoutingModule
  ]
})
export class BrandsModule { }
