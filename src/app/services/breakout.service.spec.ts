import { TestBed } from '@angular/core/testing';

import { BreakoutService } from './breakout.service';

describe('BreakoutService', () => {
  let service: BreakoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
