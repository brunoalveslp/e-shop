import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryMethodsComponent } from './delivery-methods/delivery-methods.component';

const routes: Routes = [
  {path: '', component: DeliveryMethodsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryMethodsRoutingModule { }
