import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicallyValidMainComponent } from './technically-valid-main.component';

describe('TechnicallyValidMainComponent', () => {
  let component: TechnicallyValidMainComponent;
  let fixture: ComponentFixture<TechnicallyValidMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicallyValidMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicallyValidMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
