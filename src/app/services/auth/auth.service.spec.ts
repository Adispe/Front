import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";

describe("AuthService", () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, HttpClient],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully with correct credentials', () => {
    const mockData = { username: 'test', password: 'test' };
    const mockResponse = { token: 'mockToken' };

    service.login(mockData).subscribe((response) => {
      expect(response).toEqual(mockResponse); // Adjust the expectation based on your actual API response.
    });

    const req = httpMock.expectOne(`${service.apiUrl}/register`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should register successfully', () => {
    const user = {
      username: 'test',
      password: 'test',
    };
    const mockResponse = { message: 'User registered successfully' };

    service.register(user).subscribe((response) => {
      expect(response).toEqual(mockResponse); // Adjust the expectation based on your actual API response.
    });

    const req = httpMock.expectOne(`${service.apiUrl}/register`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it("should authenticate user", () => {
    service.authenticate();
    expect(service.isLoggedIn()).toBe(true);
  });

  it("should logout user", () => {
    service.logout();
    expect(service.isLoggedIn()).toBe(false);
  });

  it('should check if token exists', () => {
    localStorage.setItem('auth_token', 'mockToken');
    expect(service.hasToken()).toBe(true);
  });

  it('should get token', () => {
    localStorage.setItem('auth_token', 'mockToken');
    expect(service.getToken()).toEqual('mockToken');
  });

  it('should remove token', () => {
    localStorage.setItem('auth_token', 'mockToken');
    service.removeToken();
    expect(localStorage.getItem('auth_token')).toBeNull();
  });
});
