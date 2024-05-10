import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { StockComponent } from './stock/stock.component';
import { StockRoutingModule } from './stock-routing.module';
import { FilterPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StockComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,

  ],
  exports: [
    StockComponent,
    StockRoutingModule
  ]
})
export class StockModule { }
