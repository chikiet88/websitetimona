import { TestBed } from '@angular/core/testing';

import { AddFooterService } from './add-footer.service';

describe('AddFooterService', () => {
  let service: AddFooterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddFooterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
