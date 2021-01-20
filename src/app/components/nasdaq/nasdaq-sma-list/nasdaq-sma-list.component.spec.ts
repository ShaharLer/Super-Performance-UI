import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NasdaqSmaListComponent } from './nasdaq-sma-list.component';

describe('NasdaqSmaListComponent', () => {
  let component: NasdaqSmaListComponent;
  let fixture: ComponentFixture<NasdaqSmaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NasdaqSmaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NasdaqSmaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
