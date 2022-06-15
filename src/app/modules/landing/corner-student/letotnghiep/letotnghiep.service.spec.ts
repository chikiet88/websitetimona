import { TestBed } from '@angular/core/testing';

import { LetotnghiepService } from './letotnghiep.service';

describe('LetotnghiepService', () => {
  let service: LetotnghiepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LetotnghiepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
