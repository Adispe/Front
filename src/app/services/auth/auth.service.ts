import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthenticated = false;
  private tokenKey = "auth_token";
  public apiUrl = "http://localhost:3000/auth";

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    const url = `${this.apiUrl}/register`;
    const body = data;
    return this.http.post(url, body);
  }

  register(user: any) {
    const url = `${this.apiUrl}/register`;
    const body = { username: user.username, password: user.password };
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
