import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksProcessingMainComponent } from './stocks-processing-main.component';

describe('StocksProcessingMainComponent', () => {
  let component: StocksProcessingMainComponent;
  let fixture: ComponentFixture<StocksProcessingMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StocksProcessingMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksProcessingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
