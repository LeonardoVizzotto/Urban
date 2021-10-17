import { Injectable } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { User } from './model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject$ = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject$.asObservable();

  constructor() {
    const token = localStorage.getItem('authToken') || '';
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
        localStorage.setItem('authToken', token);
        this.currentUserSubject$.next(user);
        return user;
      })
    );
  }

  public logout() {
    localStorage.removeItem('authToken');
    this.currentUserSubject$.next(null);
  }

  private validateCredentials(user: User) {
    return user.email === 'johndoe@gmail.com' && user.password === 'test123'
      ? of({
          user,
          token: '@token',
        })
      : throwError({
          message: 'Invalid credentials',
        });
  }

  private isTokenValid(token: string) {
    return token?.charAt(0) === '@';
  }

  private getUserData(token: string) {
    if (!this.isTokenValid(token)) {
      return throwError({
        message: 'Invalid token',
      });
    }

    return of({
      email: 'johndoe@gmail.com',
    });
  }
}
