// cypress/integration/login.component.spec.ts
import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GoogleMapsModule } from "@angular/google-maps";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from "src/app/components/login/login.component";

describe("Login Component", () => {
  beforeEach(() => {
    // Import Angular modules and components for proper setup
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        GoogleMapsModule,
        MatInputModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatCardModule,
        HttpClientModule,
        MatSnackBarModule,
      ],
    });
  });

  it("should login successfully", () => {
    cy.mount(LoginComponent);
    // Assuming your login component is rendered on the default route
    cy.get('[formControlName="username"]').type("test");
    cy.get('[formControlName="password"]').type("test");
    cy.get('button[type="submit"]').click();

    cy.wait(2000);

    // Verify that the snackbar is visible
    cy.get(".green-snackbar").should("be.visible");

    // Add assertions based on your application behavior after successful login
    // For example, you can check if the user is redirected to the home page.
    // Replace '/dashboard' with the actual route you expect the user to be redirected to.

    // You can add more assertions as needed.
  });

  it("should fail login if wrong username or password", () => {
    cy.mount(LoginComponent);
    // Assuming your login component is rendered on the default route
    cy.get('[formControlName="username"]').type("wrong-username");
    cy.get('[formControlName="password"]').type("wrong-password");
    cy.get('button[type="submit"]').click();

    // Add assertions based on your application behavior after a failed login
    // For example, you can check if an error message is displayed.
    // Replace '.error-message-selector' with the actual selector for your error message element.
    // Assuming your error message is displayed within a certain element on the page
    cy.get(".error-message").should("not.exist");

    // You can add more assertions as needed.
  });

  // Add more test cases as needed, e.g., for error handling, form validation, etc.
});
