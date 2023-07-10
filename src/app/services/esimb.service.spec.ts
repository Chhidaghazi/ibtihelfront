import { TestBed } from '@angular/core/testing';

import { EsimbService } from './esimb.service';

describe('EsimbService', () => {
  let service: EsimbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsimbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
