import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';


const routes: Routes = [
  { path: '', component: HomeComponent, data: {breadcrumb:'Home'} },
  { path: 'test-error', component: TestErrorComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule), data: { breadcrumb: 'Painel'}},
  { path: 'shop', loadChildren: () => import('./pages/shop/shop.module').then(m => m.ShopModule), data: { breadcrumb: 'Loja'}},
  { path: 'cart', loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule), data: {breadcrumb:'Carrinho'} },
  {
    path: 'checkout',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/checkout/checkout.module')
      .then(m => m.CheckoutModule)
  },
  { path: 'orders',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/orders/orders.module')
      .then(m => m.OrdersModule), data: {breadcrumb:'Pedidos'}
  },
  { path: 'account', loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule), data: {breadcrumb:'Conta'} },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
