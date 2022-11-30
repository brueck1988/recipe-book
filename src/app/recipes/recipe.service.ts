import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model'

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  
  private recipes: Recipe[] = [
    new Recipe('A Test Recipe1', 'This is simply a test1', 'https://www.cookipedia.co.uk/wiki/images/2/2d/Chicken_curry_%282%29_recipe.jpg'),
    new Recipe('A Test Recipe2', 'This is simply a test2', 'https://www.cookipedia.co.uk/wiki/images/2/2d/Chicken_curry_%282%29_recipe.jpg')
  ];

  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }
}
