import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'types', loadChildren: () => import('./types/types.module').then(m => m.TypesModule), data: { breadcrumb: 'Tipos'}, outlet: 'admin' },
      { path: 'brands', loadChildren: () => import('./brands/brands.module').then(m => m.BrandsModule), data: { breadcrumb: 'Marcas'}, outlet: 'admin' },
      { path: 'units', loadChildren: () => import('./units/units.module').then(m => m.UnitsModule), data: { breadcrumb: 'Unidades'}, outlet: 'admin' },
      { path: 'deliveryMethod', loadChildren: () => import('./delivery-methods/delivery-methods.module').then(m => m.DeliveryMethodsModule), data: { breadcrumb: 'Tipo de Entrega'}, outlet: 'admin' },
      { path: 'productSizes', loadChildren: () => import('./productSizes/product-sizes.module').then(m => m.ProductSizesModule), data: { breadcrumb: 'Tamanhos'}, outlet: 'admin' },
      { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule), data: { breadcrumb: 'Produtos'}, outlet: 'admin' },
    ]
  }
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
