import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    console.log("user IS");
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCHR0QCz9UNB-RE1F-zXz3OeKgs9G1oVhE',
      { 
        email: email,
        password: password,
        returnSecureToken: true
      }
     ).pipe(catchError(this.handleError), tap(resData => this.handleAuthentication(
      resData.email, 
      resData.localId, 
      resData.idToken, 
      +resData.expiresIn
     )));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCHR0QCz9UNB-RE1F-zXz3OeKgs9G1oVhE',
      { 
        email: email,
        password: password,
        returnSecureToken: true
      }
      ).pipe(catchError(this.handleError), tap(resData => this.handleAuthentication(
        resData.email, 
        resData.localId, 
        resData.idToken, 
        +resData.expiresIn
       )));
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email, 
      userId, 
      token, 
      expirationDate
      );
      console.log("user IS" + this.user);
      this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured';
    if(!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
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
    return throwError(errorMessage);
  }
}