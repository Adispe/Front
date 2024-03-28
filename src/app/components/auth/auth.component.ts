import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent {
  username: string = "";
  password: string = "";

  constructor(private authService: AuthService) {}

  onSubmit() {
    const user = { username: this.username, password: this.password };
    this.authService
      .register(user)
      .subscribe((data: any) => {
      });
  }
}
