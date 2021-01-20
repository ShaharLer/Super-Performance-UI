import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakoutMainComponent } from './breakout-main.component';

describe('BreakoutMainComponent', () => {
  let component: BreakoutMainComponent;
  let fixture: ComponentFixture<BreakoutMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreakoutMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakoutMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
