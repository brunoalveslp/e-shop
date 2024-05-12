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

//
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { getPortuguesePaginatorIntl } from './pager/portuguese-paginator-intl';


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
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatTabsModule,
    MatFormFieldModule,
    MatListModule,
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
    SizesComponent,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatTabsModule,
    MatFormFieldModule,
    MatListModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() }
  ]
})
export class SharedModule { }
