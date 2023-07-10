import { TestBed } from '@angular/core/testing';

import { FacturationServiceService } from './facturation-service.service';

describe('FacturationServiceService', () => {
  let service: FacturationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
