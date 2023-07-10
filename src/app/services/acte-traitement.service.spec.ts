import { TestBed } from '@angular/core/testing';

import { ActeTraitementService } from './acte-traitement.service';

describe('ActeTraitementService', () => {
  let service: ActeTraitementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActeTraitementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
