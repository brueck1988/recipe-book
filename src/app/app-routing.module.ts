import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(module => module.RecipesModule) }, //This enables lazy loading
  { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(module => module.ShoppingListModule) }, //This enables lazy loading
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule) }//, //This enables lazy loading
  // { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not Found!'} },
  // { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})], // Preloading all modules downloads lazily loaded modules when the initial app module has been downloaded. This way the app opens quicker and all parts of the app are available when neeeded
  exports: [RouterModule]
})
export class AppRoutingModule { }