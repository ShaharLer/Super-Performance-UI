import { TestBed } from '@angular/core/testing';

import { StocksFilterService } from './stocks-filter.service';

describe('StocksFilterService', () => {
  let service: StocksFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StocksFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
