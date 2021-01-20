import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NasdaqMainComponent } from './nasdaq-main.component';

describe('NasdaqMainComponent', () => {
  let component: NasdaqMainComponent;
  let fixture: ComponentFixture<NasdaqMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NasdaqMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NasdaqMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
