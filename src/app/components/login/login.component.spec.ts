import {
  ComponentFixture,
  TestBed,
  waitForAsync,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { LoginComponent } from "./login.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RouterTestingModule } from "@angular/router/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthService } from "src/app/services/auth/auth.service";
import { of } from "rxjs";
import { HeaderComponent } from "src/app/layout/header/header.component";
import { MatToolbarModule } from "@angular/material/toolbar";

class MockAuthService {
  login() {
    return of({});
  }

  authenticate() {}

  setToken() {}
}

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, HeaderComponent],
      imports: [
        MatSnackBarModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatToolbarModule
      ],
      providers: [
        MatToolbarModule,
        RouterTestingModule,
        { provide: AuthService, useClass: MockAuthService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    const spy = jasmine.createSpyObj("AuthService", [
      "login",
      "authenticate",
      "setToken",
    ]);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        RouterTestingModule,
        MatCardModule,
      ],
      providers: [{ provide: AuthService, useValue: spy }],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it("should create the LoginComponent", () => {
    expect(component).toBeTruthy();
  });

  it("should render the login form", () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("form")).toBeTruthy();
  });

  // it("should call authService.login when the form is submitted", fakeAsync(() => {
  //   component.ngOnInit();
  //   component.loginForm.setValue({
  //     username: "testuser",
  //     password: "testpassword",
  //   });

  //   authServiceSpy.login.and.returnValue(of({}));

  //   component.onFormSubmit();

  //   tick();

  //   expect(authServiceSpy.login).toHaveBeenCalledOnceWith({
  //     username: "testuser",
  //     password: "testpassword",
  //   });
  // }));

  // it("should call authService.authenticate and setToken when login is successful", fakeAsync(() => {
  //   component.ngOnInit();
  //   component.loginForm.setValue({
  //     username: "testuser",
  //     password: "testpassword",
  //   });

  //   authServiceSpy.login.and.returnValue(of({}));
  //   authServiceSpy.authenticate.and.stub();
  //   authServiceSpy.setToken.and.stub();

  //   component.onFormSubmit();

  //   tick();

  //   expect(authServiceSpy.authenticate).toHaveBeenCalledOnceWith();
  //   expect(authServiceSpy.setToken).toHaveBeenCalledOnceWith("milk");
  // }));

  it("should display a snackbar on successful login", fakeAsync(() => {
    component.ngOnInit();
    component.loginForm.setValue({
      username: "testuser",
      password: "testpassword",
    });

    authServiceSpy.login.and.returnValue(of({}));
    authServiceSpy.authenticate.and.stub();
    authServiceSpy.setToken.and.stub();

    const snackbarSpy = spyOn(component, "openSnackBar");

    component.onFormSubmit();

    tick();

    expect(snackbarSpy).toHaveBeenCalledOnceWith();
  }));
});
