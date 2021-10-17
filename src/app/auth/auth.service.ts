import { Injectable } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject$ = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject$.asObservable();

  constructor() {
    const token = localStorage.getItem(environment.TOKEN_NAME) || '';
    this.getUserData(token)
      .pipe(first())
      .subscribe((user) => this.currentUserSubject$.next(user));
  }

  public get currentUserValue() {
    return this.currentUserSubject$.getValue();
  }

  public login(email: string, password: string) {
    return this.validateCredentials({ email, password }).pipe(
      map(({ user, token }) => {
        localStorage.setItem(environment.TOKEN_NAME, token);
        this.currentUserSubject$.next(user);
        return user;
      })
    );
  }

  public logout() {
    localStorage.removeItem(environment.TOKEN_NAME);
    this.currentUserSubject$.next(null);
  }

  /**
   * In a real application this would reach out to a server
   */
  private validateCredentials(user: User) {
    return user.email === environment.USER_EMAIL &&
      user.password === environment.USER_PASSWORD
      ? of({
          user,
          token: environment.FAKE_TOKEN_VALUE,
        })
      : throwError({
          message: 'Invalid credentials',
        });
  }

  /**
   * Just to simulate a real token validation
   */
  private isTokenValid(token: string) {
    return token?.charAt(0) === '@';
  }

  /**
   * In a real application this would reach out to a server
   */
  private getUserData(token: string) {
    if (!this.isTokenValid(token)) {
      return throwError({
        message: 'Invalid token',
      });
    }

    return of({
      email: environment.USER_EMAIL,
    });
  }
}
