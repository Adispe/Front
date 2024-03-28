import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  username = '';
  password = '';
  name = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  onFormSubmit(): void {
    this.isLoadingResults = true;
    const user = { username: this.registerForm.get('username')?.value.trim(), password: this.registerForm.get('password')?.value.trim() };
    this.authService.register(user).subscribe({
      next: (res: any) => {
        this.isLoadingResults = false;
        this.router
          .navigate(['/login'])
          .then((_) => 
          this.openSnackBar());
      },
      error: (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      },
    });
  }
  openSnackBar() {
    this._snackBar.open('You are now registered', 'x', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['green-snackbar'],
      duration: 2500,
    });
  }
}
