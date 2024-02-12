import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryMethodsComponent } from './delivery-methods/delivery-methods.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeliveryMethodsRoutingModule } from './delivery-methods-routing.module';



@NgModule({
  declarations: [
    DeliveryMethodsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    DeliveryMethodsComponent,
    DeliveryMethodsRoutingModule
  ]
})
export class DeliveryMethodsModule { }
