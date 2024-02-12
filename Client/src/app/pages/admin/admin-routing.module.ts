import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {path: '', component: AdminComponent},
  { path: 'types', loadChildren: () => import('./types/types.module').then(m => m.TypesModule), data: { breadcrumb: 'Tipos'}},
  { path: 'brands', loadChildren: () => import('./brands/brands.module').then(m => m.BrandsModule), data: { breadcrumb: 'Marcas'}},
  { path: 'units', loadChildren: () => import('./units/units.module').then(m => m.UnitsModule), data: { breadcrumb: 'Unidades'}},
  { path: 'deliveryMethod', loadChildren: () => import('./delivery-methods/delivery-methods.module').then(m => m.DeliveryMethodsModule), data: { breadcrumb: 'Tipo de Entrega'}},
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule), data: { breadcrumb: 'Produtos'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
