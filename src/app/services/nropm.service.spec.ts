import { TestBed } from '@angular/core/testing';

import { NropmService } from './nropm.service';

describe('NropmService', () => {
  let service: NropmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NropmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
