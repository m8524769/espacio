import { TestBed } from '@angular/core/testing';

import { EpubService } from './epub.service';

describe('EpubService', () => {
  let service: EpubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
