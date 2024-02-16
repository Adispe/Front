import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let fixture: ComponentFixture<ProfileComponent>;
  let component: ProfileComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [MatCardModule, MatButtonModule],
    });

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create the ProfileComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should display user information in the template', () => {
    fixture.detectChanges();

    const cardTitle = fixture.nativeElement.querySelector('mat-card-title');
    const cardSubtitle = fixture.nativeElement.querySelector('mat-card-subtitle');
    const bioParagraph = fixture.nativeElement.querySelector('mat-card-content p');

    expect(cardTitle.textContent).toContain(component.user.name);
    expect(cardSubtitle.textContent).toContain(component.user.email);
    expect(bioParagraph.textContent).toContain(component.user.bio);
  });

  it('should have "Edit Profile" and "Logout" buttons', () => {
    fixture.detectChanges();

    const editProfileButton = fixture.nativeElement.querySelector(
      'mat-card-actions button[color="primary"]'
    );
    const logoutButton = fixture.nativeElement.querySelector(
      'mat-card-actions button[color="warn"]'
    );

    expect(editProfileButton).toBeTruthy();
    expect(logoutButton).toBeTruthy();
  });
});
