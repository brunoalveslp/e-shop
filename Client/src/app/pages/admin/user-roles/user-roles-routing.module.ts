import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypesComponent } from './types/types.component';

const routes: Routes = [
  {path: '', component: TypesComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypesRoutingModule { }
