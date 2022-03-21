import { TestBed } from '@angular/core/testing';

import { MainlayoutService } from './mainlayout.service';

describe('MainlayoutService', () => {
  let service: MainlayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainlayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
