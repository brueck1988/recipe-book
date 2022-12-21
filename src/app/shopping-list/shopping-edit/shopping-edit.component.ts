import * as ShoppingListActions from './../store/shopping-list.actions';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) shoppingListForm: NgForm; 
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{shoppingList: {ingredients: Ingredient[] }}>) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditingIngredient
      .subscribe(
        (index: number) => {
         this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.shoppingListForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
      });
  }

  onSubmitIngredient() {
    const value = this.shoppingListForm.value;
    const ingredient = new Ingredient(value.name, value.amount);
    //this.shoppingListService.IngredientAdded.emit(newIngredient);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
    } else {
      // this.shoppingListService.addIngredient(ingredient); // Code for service rather than ngrx
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    }
    this.onClear();
  }

  onClear() {
    this.shoppingListForm.resetForm();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
