import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakoutErrorComponent } from './breakout-error.component';

describe('BreakoutErrorComponent', () => {
  let component: BreakoutErrorComponent;
  let fixture: ComponentFixture<BreakoutErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreakoutErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakoutErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
