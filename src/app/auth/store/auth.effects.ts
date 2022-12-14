import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import * as AuthActions from './auth.actions';

export interface AuthResponseData {
	kind: string;
	idToken: string;
	email: string;
	refreshToken: string;
	expiresIn: string;
	localId: string;
	registered?: boolean;
}

const handleAuthentication = (expiresIn: number, email: string, userId: string, token: string) => {
	const expirationDate = new Date(
		new Date().getTime() + expiresIn * 1000
	  );
	  return new AuthActions.AuthenticateSuccess({
		email: email,
		userId: userId,
		token: token,
		expirationDate: expirationDate
	});
}

const handleError = (errorRes: any) => {
	let errorMessage = 'An unknown error occured';
	if(!errorRes.error || !errorRes.error.error) {
		return of(new AuthActions.AuthenticateFail(errorMessage));
	}
	switch (errorRes.error.error.message) {
	  case 'EMAIL_EXISTS':
		errorMessage = 'This email already has an account.';
		break;
	  case 'EMAIL_NOT_FOUND':
		errorMessage = 'An account does not exist for this email address.';
		break;
		case 'INVALID_PASSWORD':
		  errorMessage = 'Entered password was incorrect. Please try again.'
		  break;
	}
	return of(new AuthActions.AuthenticateFail(errorMessage));
}

@Injectable()
export class AuthEffects {
	@Effect()
	authSignup = this.actions$.pipe(
		ofType(AuthActions.SIGNUP_START),
		switchMap((signupAction: AuthActions.SignupStart) => {
			return this.http.post<AuthResponseData>(
				'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
				{ 
				  email: signupAction.payload.email,
				  password: signupAction.payload.password,
				  returnSecureToken: true
				}
			)
			.pipe(
				map(resData => {
					return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
				}),
				catchError(errorRes => {
					return handleError(errorRes);
				})
			);
		})
	);

	@Effect() // Required for NgRx to pick this class up as an effect
	authLogin = this.actions$.pipe( // NgRx automatically calls subscribe here, so it doesn't have to be explicitly written
		ofType(AuthActions.LOGIN_START), // allows you to define a filter for which types of effects you want to continue in the obserable pipe
		switchMap((authData: AuthActions.LoginStart) => {
			return this.http
				.post<AuthResponseData>(
					'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
					{ 
					email: authData.payload.email,
					password: authData.payload.password,
					returnSecureToken: true
					}
				)
				.pipe(
					map(resData => {
					  return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
				}),
				catchError(errorRes => {
					return handleError(errorRes);
				})
			);
		})
	);

	@Effect({ dispatch: false })
	authSuccess = this.actions$.pipe(
	  ofType(AuthActions.AUTHENTICATE_SUCCESS),
	  tap(() => {
		this.router.navigate(['/']);
	  })
	);

	constructor(
		private actions$: Actions,
		private http: HttpClient,
		private router: Router
	  ) {}
}