import { TestBed } from '@angular/core/testing';

import { AddGiangvienService } from './add-giangvien.service';

describe('AddGiangvienService', () => {
  let service: AddGiangvienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddGiangvienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
