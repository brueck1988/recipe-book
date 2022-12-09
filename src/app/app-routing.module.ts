import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { NoRecipeSelectedComponent } from './recipes/no-recipe-selected/no-recipe-selected.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent, children: [
    { path: '', component: NoRecipeSelectedComponent },
    { path: 'new', component: RecipeEditComponent },
    { path: ':id', component: RecipeDetailComponent },
    { path: ':id/edit', component: RecipeEditComponent },
  ] },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not Found!'} },
  // { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
