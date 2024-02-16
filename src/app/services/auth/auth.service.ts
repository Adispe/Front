import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
<<<<<<< HEAD
import { Observable } from "rxjs";
=======
>>>>>>> develop

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthenticated = false;
  private tokenKey = "auth_token";
  private apiUrl = "http://example.com/api";

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    if (data.username === "test" && data.password === "test") {
      return new Observable(() => {
        "Login Successful";
      });
    } else {
      return new Observable(() => {
        "invalid credentials";
      });
    }
    const url = `${this.apiUrl}/login`;
    const body = data;
    return this.http.post(url, body);
  }

  register(email: string, password: string) {
    const url = `${this.apiUrl}/register`;
    const body = { email, password };
    return this.http.post(url, body);
  }

  authenticate() {
    this.isAuthenticated = true;
  }

  logout(): void {
    // Perform any logout actions (e.g., clearing tokens or session data).
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  hasToken(): boolean {
    // Check if the token exists (regardless of its validity)
    return !!this.getToken();
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
