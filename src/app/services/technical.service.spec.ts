import { TestBed } from '@angular/core/testing';

import { StocksProcessingService } from './technical.service';

describe('StocksProcessingService', () => {
  let service: StocksProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StocksProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
