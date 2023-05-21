import { TestBed } from '@angular/core/testing';

import { ColorDetermineService } from './color-determine.service';

describe('ColorDetermineService', () => {
  let service: ColorDetermineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorDetermineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
