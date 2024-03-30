import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IaresultComponent } from './iaresult.component';

describe('IaresultComponent', () => {
  let component: IaresultComponent;
  let fixture: ComponentFixture<IaresultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IaresultComponent]
    });
    fixture = TestBed.createComponent(IaresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
