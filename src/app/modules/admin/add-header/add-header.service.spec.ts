import { TestBed } from '@angular/core/testing';

import { AddHeaderService } from './add-header.service';

describe('AddHeaderService', () => {
  let service: AddHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
