import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NasdaqErrorComponent } from './nasdaq-error.component';

describe('NasdaqErrorComponent', () => {
  let component: NasdaqErrorComponent;
  let fixture: ComponentFixture<NasdaqErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NasdaqErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NasdaqErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
