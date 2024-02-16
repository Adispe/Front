import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterTestingModule } from "@angular/router/testing";
import { HeaderComponent } from "./header.component";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [MatToolbarModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the HeaderComponent", () => {
    expect(component).toBeTruthy();
  });

  it('should render the title "SKY Scan" in a button with routerLink "/"', () => {
    const compiled = fixture.debugElement.nativeElement;
    const titleButton = compiled.querySelector(".title");

    expect(titleButton).toBeTruthy();
    expect(titleButton.textContent).toContain("SKY Scan");
    expect(titleButton.getAttribute("routerLink")).toBe("/");
  });

  it('should render a mat-icon-button with routerLink "/login"', () => {
    const compiled = fixture.debugElement.nativeElement;
    const iconButton = compiled.querySelector(".example-icon");

    expect(iconButton).toBeTruthy();
    expect(iconButton.getAttribute("routerLink")).toBe("/login");

    const matIcon = iconButton.querySelector("mat-icon");
    expect(matIcon).toBeTruthy();
    expect(matIcon.textContent.trim()).toBe("group");
  });
});
