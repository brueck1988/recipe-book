import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth.interceptor.service';
import { RecipeService } from './recipes/recipe.service';
// import { ShoppingListService } from './shopping-list/shopping-list.service'; //Replaced by NgRx



@NgModule({
  providers: [
    // ShoppingListService, //Replaced by NgRx
    RecipeService, 
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService, 
      multi: true
    }
  ],
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
