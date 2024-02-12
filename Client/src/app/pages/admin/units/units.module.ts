import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { UnitsRoutingModule } from './units-routing.module';
import { UnitsComponent } from './units/units.component';



@NgModule({
  declarations: [
    UnitsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    UnitsComponent,
    UnitsRoutingModule
  ]
})
export class UnitsModule { }
