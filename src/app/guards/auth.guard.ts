import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    // Check if the user is logged in or has a token
    if (this.authService.isLoggedIn() || this.authService.hasToken()) {
      return true;
    }

    // If not logged in or doesn't have a token, redirect to the login page
    return this.router.parseUrl('/login');
  }
}
