import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';

const routes: Routes = [
  { path: '', component: ShoppingListComponent } //path is blank because it's defined in app routing module for lazy loading
  // { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not Found!'} },
  // { path: '**', redirectTo: '/not-found' }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule { }
