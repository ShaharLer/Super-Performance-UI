import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NasdaqDatesBarComponent } from './nasdaq-dates-bar.component';

describe('NasdaqDatesBarComponent', () => {
  let component: NasdaqDatesBarComponent;
  let fixture: ComponentFixture<NasdaqDatesBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NasdaqDatesBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NasdaqDatesBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
