import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth/auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'hasToken']);
    const routerSpy = jasmine.createSpyObj('Router', ['parseUrl']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow navigation if user is logged in', () => {
    authService.isLoggedIn.and.returnValue(true);
    const canActivateResult = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(canActivateResult).toBe(true);
  });

  it('should allow navigation if user has a token', () => {
    authService.isLoggedIn.and.returnValue(false);
    authService.hasToken.and.returnValue(true);
    const canActivateResult = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(canActivateResult).toBe(true);
  });

  it('should redirect to login page if user is not logged in and has no token', () => {
    authService.isLoggedIn.and.returnValue(false);
    authService.hasToken.and.returnValue(false);
    const parseUrlResult = {} as UrlTree;
    router.parseUrl.and.returnValue(parseUrlResult);
    const canActivateResult = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(canActivateResult).toBe(parseUrlResult);
    expect(router.parseUrl).toHaveBeenCalledWith('/login');
  });
});
