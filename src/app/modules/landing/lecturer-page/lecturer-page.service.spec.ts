import { TestBed } from '@angular/core/testing';

import { LecturerPageService } from './lecturer-page.service';

describe('LecturerPageService', () => {
  let service: LecturerPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LecturerPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
