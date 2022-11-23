import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A Test Recipe1', 'This is simply a test1', 'https://www.cookipedia.co.uk/wiki/images/2/2d/Chicken_curry_%282%29_recipe.jpg'),
    new Recipe('A Test Recipe2', 'This is simply a test2', 'https://www.cookipedia.co.uk/wiki/images/2/2d/Chicken_curry_%282%29_recipe.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectRecipe(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
