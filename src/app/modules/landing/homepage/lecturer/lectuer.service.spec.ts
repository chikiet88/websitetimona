import { TestBed } from '@angular/core/testing';

import { LectuerService } from './lectuer.service';

describe('LectuerService', () => {
  let service: LectuerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LectuerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
