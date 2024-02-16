import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should login successfully with correct credentials', () => {
  //   const mockData = { username: 'test', password: 'test' };

  //   service.login(mockData).subscribe((response) => {
  //     expect(response).toBe('Login Successful');
  //   });

  //   const req = httpMock.expectOne(`${service.apiUrl}/login`);
  //   expect(req.request.method).toBe('POST');
  //   req.flush('Login Successful');
  // });

  // it('should handle invalid credentials during login', () => {
  //   const mockData = { username: 'invalid', password: 'invalid' };

  //   service.login(mockData).subscribe(
  //     () => {},
  //     (error) => {
  //       expect(error).toBe('invalid credentials');
  //     }
  //   );

  //   const req = httpMock.expectOne(`${service.apiUrl}/login`);
  //   expect(req.request.method).toBe('POST');
  //   req.flush('invalid credentials', { status: 401, statusText: 'Unauthorized' });
  // });

  it('should register successfully', () => {
    const email = 'test@example.com';
    const password = 'password';

    service.register(email, password).subscribe((response) => {
      expect(response).toBeTruthy(); // Adjust the expectation based on your actual API response.
    });

    const req = httpMock.expectOne(`${service.apiUrl}/register`);
    expect(req.request.method).toBe('POST');
    req.flush({}); // Adjust the response based on your actual API response.
  });

  it('should authenticate user', () => {
    service.authenticate();
    expect(service.isLoggedIn()).toBe(true);
  });

  it('should logout user', () => {
    service.logout();
    expect(service.isLoggedIn()).toBe(false);
  });
});
