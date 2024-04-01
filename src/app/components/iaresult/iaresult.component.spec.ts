import { ComponentFixture, TestBed } from "@angular/core/testing";

import { IaresultComponent } from "./iaresult.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GoogleMapsModule } from "@angular/google-maps";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxCaptureModule } from "ngx-capture";
import { AppRoutingModule } from "src/app/app-routing.module";

describe("IaresultComponent", () => {
  let component: IaresultComponent;
  let fixture: ComponentFixture<IaresultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IaresultComponent],
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
        NgxCaptureModule,
        MatDialogModule,
        MatProgressSpinnerModule,
      ],
      providers: [
        MatDialog,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    });
    fixture = TestBed.createComponent(IaresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
