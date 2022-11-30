import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  IngredientsChanged = new EventEmitter<Ingredient[]>();
  IngredientAdded = new EventEmitter<Ingredient>();

  constructor() { }

  //Manage list of ingredients
  //Add add ingredient method here
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.IngredientsChanged.emit(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients); //spread operator converts the array into a list and adds one array element at a time
    this.IngredientsChanged.emit(this.ingredients.slice());
  }

}