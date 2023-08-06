import { TestBed } from '@angular/core/testing';

import { HeaderBarComponentTsService } from './header-bar.component.ts.service';

describe('HeaderBarComponentTsService', () => {
  let service: HeaderBarComponentTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderBarComponentTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
