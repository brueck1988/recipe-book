import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';

const routes: Routes = [
  { path: 'shopping-list', component: ShoppingListComponent }
  // { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not Found!'} },
  // { path: '**', redirectTo: '/not-found' }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule { }
