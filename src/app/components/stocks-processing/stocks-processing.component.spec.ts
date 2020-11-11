import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksProcessingComponent } from './stocks-processing.component';

describe('StocksProcessingComponent', () => {
  let component: StocksProcessingComponent;
  let fixture: ComponentFixture<StocksProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StocksProcessingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
