//////////////////////Service replaced by NgRx//////////////

// import { Subject } from 'rxjs';
// import { Injectable } from '@angular/core';
// import { Ingredient } from '../shared/ingredient.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class ShoppingListService {
//   ingredientsChanged = new Subject<Ingredient[]>();
//   startedEditingIngredient = new Subject<number>();
//   index: number;

//   constructor() { }

//   private ingredients: Ingredient[] = [
//     new Ingredient('Apples', 5),
//     new Ingredient('Tomatoes', 10)
//   ];

//   getIngredients() {
//     return this.ingredients.slice();
//   }

//  getIngredient(index: number) {
//     return this.ingredients[index];
//  }
//   addIngredient(ingredient: Ingredient) {
//     this.ingredients.push(ingredient);
//     this.ingredientsChanged.next(this.ingredients.slice());
//   }

//   addIngredients(ingredients: Ingredient[]) {
//     // for (let ingredient of ingredients) {
//     //   this.addIngredient(ingredient);
//     // }
//     this.ingredients.push(...ingredients); //spread operator converts the array into a list and adds one array element at a time
//     this.ingredientsChanged.next(this.ingredients.slice());
//   }

//   updateIngredient(index: number, newIngredient: Ingredient) {
//     this.ingredients[index] = newIngredient;
//     this.ingredientsChanged.next(this.ingredients.slice());
//   }

//   deleteIngredient(index: number) {
//     this.ingredients.splice(index, 1);
//     this.ingredientsChanged.next(this.ingredients.slice());
//   }

// }