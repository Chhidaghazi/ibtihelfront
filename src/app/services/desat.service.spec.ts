import { TestBed } from '@angular/core/testing';

import { DesatService } from './desat.service';

describe('DesatService', () => {
  let service: DesatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
