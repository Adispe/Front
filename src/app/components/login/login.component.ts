import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnInit,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";

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
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm!: FormGroup;
  username = "";
  password = "";
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  googleButton = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _ngZone: NgZone,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  ngAfterViewInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "https://accounts.google.com/gsi/client";
    this.elementRef.nativeElement.appendChild(s);
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  onFormSubmit(): void {
    this.isLoadingResults = true;
    this.authService.login(this.loginForm.value, "password").subscribe({
      next: (res: any) => {
        this.isLoadingResults = false;
        this.authService.authenticate();
        this.authService.setToken(res.token);
        this.openSnackBar();
        this.router.navigate(["/dashboard"]);
      },
      error: (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      },
    });
  }

  openSnackBar() {
    this._snackBar.open("Connexion successful", "x", {
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: ["green-snackbar"],
      duration: 2500,
    });
  }
}
