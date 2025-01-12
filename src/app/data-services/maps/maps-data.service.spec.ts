import { TestBed } from '@angular/core/testing';

import { MapsDataService } from './maps-data.service';

describe('MapsService', () => {
  let service: MapsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
