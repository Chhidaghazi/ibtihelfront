import { TestBed } from '@angular/core/testing';

import { DashboardPiloteService } from './dashboard-pilote.service';

describe('DashboardPiloteService', () => {
  let service: DashboardPiloteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardPiloteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
