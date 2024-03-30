import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PagerComponent } from './pager/pager.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalsComponent } from './order-totals/order-totals.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './components/text-input/text-input.component';
import { StepperComponent } from './components/stepper/stepper.component';

import {CdkStepperModule} from '@angular/cdk/stepper';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { StepperButtonsComponent } from './components/stepper-buttons/stepper-buttons.component';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { CardComponent } from './components/card/card.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ImageInputComponent } from './components/image-input/image-input.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { SizesComponent } from './components/sizes/sizes.component';

@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    OrderTotalsComponent,
    TextInputComponent,
    StepperComponent,
    CartSummaryComponent,
    StepperButtonsComponent,
    CardComponent,
    ImageInputComponent,
    BreadcrumbComponent,
    SizesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    CdkStepperModule,
    RouterModule,
    AccordionModule,
    ModalModule.forRoot(),
  ],
  exports: [
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    CarouselModule,
    OrderTotalsComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent,
    StepperComponent,
    CdkStepperModule,
    CartSummaryComponent,
    StepperButtonsComponent,
    AccordionModule,
    CardComponent,
    ModalModule,
    ImageInputComponent,
    BreadcrumbComponent,
    SizesComponent
  ]
})
export class SharedModule { }
