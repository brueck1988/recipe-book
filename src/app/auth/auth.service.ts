import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCHR0QCz9UNB-RE1F-zXz3OeKgs9G1oVhE',
      { 
        email: email,
        password: password,
        returnSecureToken: true
      }
     ).pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCHR0QCz9UNB-RE1F-zXz3OeKgs9G1oVhE',
      { 
        email: email,
        password: password,
        returnSecureToken: true
      }
      ).pipe(catchError(this.handleError));
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
