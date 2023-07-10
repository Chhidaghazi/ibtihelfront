import { TestBed } from '@angular/core/testing';

import { PmService } from './pm.service';

describe('PmService', () => {
  let service: PmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
