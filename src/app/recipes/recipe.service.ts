import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model'

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel', 
      'A super-tasty Schnitzel - just awesome', 
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/10/29/0/FNM_110118-Portobello-Mushroom-Schnitzel_s4x3.jpg.rend.hgtvcom.616.462.suffix/1540856950782.jpeg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe(
      'Big Fat Burger', 
      'What else do you need to say?', 
      'https://i.stack.imgur.com/XGFw7m.jpg',
      [
        new Ingredient('Bun', 1),
        new Ingredient('Beef Patty', 1),
        new Ingredient('Tomato', 1)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
