import { TestBed } from '@angular/core/testing';

import { FormdangkykhachhangService } from './formdangkykhachhang.service';

describe('FormdangkykhachhangService', () => {
  let service: FormdangkykhachhangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormdangkykhachhangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
