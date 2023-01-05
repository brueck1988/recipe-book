import { AuthService } from './auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // return this.authService.user.pipe( // Replaced by ngrx
    return this.store.select('auth').pipe(
      take(1), // take(1) - takes one value from the observable and then automatically unsubscribes
      map(authState => {
        return authState.user;
      }), //Add this line for use with ngrx
      exhaustMap(user => { // exhaustMap passes observable to next pipe
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)}); // Add query params - api expects 'auth' key
        return next.handle(modifiedReq);
      }));
  }
}

