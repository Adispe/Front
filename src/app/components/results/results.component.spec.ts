import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ResultsComponent } from "./results.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GoogleMapsModule } from "@angular/google-maps";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
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

describe("ResultsComponent", () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsComponent],
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
        { provide: MAT_DIALOG_DATA, useValue: 'test-image-url' },
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
      ],
    });
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog when sendImage is called', () => {
    const matDialogRef = TestBed.inject(MatDialogRef);
    component.sendImage();
    expect(matDialogRef.close).toHaveBeenCalledWith('test-image-url');
  });
});
