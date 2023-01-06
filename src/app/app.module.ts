// import { AuthModule } from './auth/auth.module'; // If the module is commented out below, but the import still remains, the code will work but the recipes module will still be eagerly loaded.
import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';
// import { ShoppingListModule } from './shopping-list/shopping-list.module'; // If the module is commented out below, but the import still remains, the code will work but the recipes module will still be eagerly loaded.
// import { RecipesModule } from './recipes/recipes.module'; // If the module is commented out below, but the import still remains, the code will work but the recipes module will still be eagerly loaded.
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects'
import { AuthEffects } from './auth/store/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects]),
    AppRoutingModule,
    // RecipesModule, // Do not load recipes module here because it's being lazily loaded in router. Modules loaded here are eagerly loaded.
    // ShoppingListModule, // Do not load module here because it's being lazily loaded in router. Modules loaded here are eagerly loaded.
    SharedModule,
    CoreModule,
    // AuthModule // Do not load module here because it's being lazily loaded in router. Modules loaded here are eagerly loaded.
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
