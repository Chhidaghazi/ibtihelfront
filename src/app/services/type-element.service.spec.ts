import { TestBed } from '@angular/core/testing';

import { TypeElementService } from './type-element.service';

describe('TypeElementService', () => {
  let service: TypeElementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeElementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
