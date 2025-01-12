import { TestBed } from '@angular/core/testing';

import { BrawlersDataService } from './brawlers-data.service';

describe('BrawlersService', () => {
  let service: BrawlersDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrawlersDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
