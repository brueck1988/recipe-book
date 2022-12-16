import { AuthService } from './../auth/auth.service';
import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient, 
    private recipeService: RecipeService, 
    private authService: AuthService
    ) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put('https://ng-course-recipe-book-f178a-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe((response) => { 
        console.log(response);
    });
  }

  fetchRecipes() {
    return this.authService.user.pipe(
      take(1), 
      exhaustMap(user => { // take(1) - takes one value from the observable and then automatically unsubscribes
        return this.http.get<Recipe[]>('https://ng-course-recipe-book-f178a-default-rtdb.firebaseio.com/recipes.json',
        {params: new HttpParams().set('auth', user.token)} // Add query params - api expects 'auth' key
        );
    }),
    map((recipes) => {
      return recipes.map((recipe) => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
      });
    }),
    tap(recipes => {
      this.recipeService.setRecipes(recipes);
    }) 
    ); 
  }
}
