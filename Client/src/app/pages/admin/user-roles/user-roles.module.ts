import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypesComponent } from './types/types.component';
import { TypesRoutingModule } from './user-roles-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TypesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    TypesComponent,
    TypesRoutingModule
  ]
})
export class TypesModule { }
