import { TestBed } from '@angular/core/testing';

import { VideogridService } from './videogrid.service';

describe('VideogridService', () => {
  let service: VideogridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideogridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
