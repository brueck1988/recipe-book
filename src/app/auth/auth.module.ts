import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: AuthComponent } //path is blank because it's defined in app routing module for lazy loading
];

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthModule { }
