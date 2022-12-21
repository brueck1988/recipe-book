import { AppState } from './../store/shopping-list.reducer';
import * as ShoppingListActions from './../store/shopping-list.actions';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Store } from '@ngrx/store';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) shoppingListForm: NgForm; 
  subscription: Subscription;
  editMode = false;
  // editedItemIndex: number;
  editedItem: Ingredient;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      } else {
        this.editMode = false;
      }
    });
    // this.subscription = this.shoppingListService.startedEditingIngredient // Replaced with ngrx
    //   .subscribe(
    //     (index: number) => {
    //      this.editedItemIndex = index;
    //       this.editMode = true;
    //       this.editedItem = this.shoppingListService.getIngredient(index);
    //       this.shoppingListForm.setValue({
    //         name: this.editedItem.name,
    //         amount: this.editedItem.amount
    //       })
    //   });
  }

  onSubmitIngredient() {
    const value = this.shoppingListForm.value;
    const ingredient = new Ingredient(value.name, value.amount);
    //this.shoppingListService.IngredientAdded.emit(newIngredient);
    if (this.editMode) {
      // this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient); ///Code replaced by ngrx
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(ingredient));
    } else {
      // this.shoppingListService.addIngredient(ingredient); // Code for service rather than ngrx
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    }
    this.onClear();
  }

  onClear() {
    this.shoppingListForm.resetForm();
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.editMode = false;
  }

  onDelete() {
    // this.shoppingListService.deleteIngredient(this.editedItemIndex); ///Code replaced by ngrx
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
