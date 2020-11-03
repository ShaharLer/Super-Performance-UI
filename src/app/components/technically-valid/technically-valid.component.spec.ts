import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicallyValidComponent } from './technically-valid.component';

describe('TechnicallyValidComponent', () => {
  let component: TechnicallyValidComponent;
  let fixture: ComponentFixture<TechnicallyValidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicallyValidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicallyValidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
