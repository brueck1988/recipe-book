// import { ShoppingListService } from './shopping-list.service'; // Replaced by NgRx
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[] }>;
  // private subscription: Subscription;

  constructor(
    // private shoppingListService: ShoppingListService, // Replaced by NgRx
    private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  onEditItem(index: number) {
    // this.shoppingListService.startedEditingIngredient.next(index); // replaced with ngrx
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
