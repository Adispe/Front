import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { MatButtonModule } from "@angular/material/button";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { HeaderComponent } from "./layout/header/header.component";
import { GoogleMapsComponent } from "./components/google-maps/google-maps.component";
import { GoogleMapsModule } from "@angular/google-maps";
import { HomeComponent } from "./components/home/home.component";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatCardModule } from "@angular/material/card";
import { NotFoundComponent } from "./shared/not-found/not-found.component";
import { HttpClientModule } from "@angular/common/http";
import { ProfileComponent } from "./components/profile/profile.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthComponent } from "./components/auth/auth.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NgxCaptureModule } from 'ngx-capture';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GoogleMapsComponent,
    HomeComponent,
    NotFoundComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    AuthComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    AppRoutingModule,
    MatButtonModule,
    GoogleMapsModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSnackBarModule,
    NgxCaptureModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
