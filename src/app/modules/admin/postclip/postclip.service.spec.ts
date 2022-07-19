import { TestBed } from '@angular/core/testing';

import { PostclipService } from './postclip.service';

describe('PostclipService', () => {
  let service: PostclipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostclipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
