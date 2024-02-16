import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { AuthService } from 'src/app/services/auth/auth.service';

describe('AuthComponent', () => {
  let fixture: ComponentFixture<AuthComponent>;
  let component: AuthComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
      providers: [AuthService], // You might need to provide a mock AuthService
    });

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
  });

  it('should create the AuthComponent', () => {
    expect(component).toBeTruthy();
  });

  // it('should have form inputs and a submit button', () => {
  //   fixture.detectChanges();

  //   const emailInput = fixture.nativeElement.querySelector('input[name="email"]');
  //   const passwordInput = fixture.nativeElement.querySelector('input[name="password"]');
  //   const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');

  //   expect(emailInput).toBeTruthy();
  //   expect(passwordInput).toBeTruthy();
  //   expect(submitButton).toBeTruthy();
  // });

  // it('should bind inputs to component properties', fakeAsync(() => {
  //   fixture.detectChanges();

  //   const emailInput = fixture.nativeElement.querySelector('input[name="email"]');
  //   const passwordInput = fixture.nativeElement.querySelector('input[name="password"]');

  //   component.email = 'test@example.com';
  //   component.password = 'password';

  //   emailInput.dispatchEvent(new Event('input'));
  //   passwordInput.dispatchEvent(new Event('input'));

  //   tick(); // Wait for asynchronous update

  //   expect(component.email).toEqual('test@example.com');
  //   expect(component.password).toEqual('password');
  // }));

  // it('should call onSubmit method on form submission', fakeAsync(() => {
  //   spyOn(component, 'onSubmit');

  //   fixture.detectChanges();

  //   const form = fixture.nativeElement.querySelector('form');
  //   form.dispatchEvent(new Event('submit'));
  //   tick();

  //   expect(component.onSubmit).toHaveBeenCalled();
  // }));
});
