import { TestBed } from '@angular/core/testing';

import { DangnhapService } from './dangnhap.service';

describe('DangnhapService', () => {
  let service: DangnhapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DangnhapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
