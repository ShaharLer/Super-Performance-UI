import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicallyValidErrorComponent } from './technically-valid-error.component';

describe('TechnicallyValidErrorComponent', () => {
  let component: TechnicallyValidErrorComponent;
  let fixture: ComponentFixture<TechnicallyValidErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicallyValidErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicallyValidErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
