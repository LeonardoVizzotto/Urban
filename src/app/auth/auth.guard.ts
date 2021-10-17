import { Injectable } from '@angular/core';
import { Router, CanLoad, UrlSegment, Route } from '@angular/router';
import { map, take, tap } from 'rxjs/operators';
import { ROUTES } from '../routes.constants';

import { AuthenticationService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanLoad {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canLoad(_route: Route, _urlSegment: UrlSegment[]) {
    return this.authService.currentUser$.pipe(
      take(1),
      map((user) => {
        return Boolean(user);
      }),
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate([ROUTES.LOGIN]);
        }
      })
    );
  }
}
