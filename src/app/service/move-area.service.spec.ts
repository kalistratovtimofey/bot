import { TestBed } from '@angular/core/testing';

import { MoveAreaService } from './move-area.service';

describe('MoveAreaService', () => {
  let service: MoveAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoveAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
