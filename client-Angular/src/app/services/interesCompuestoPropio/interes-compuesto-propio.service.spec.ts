import { TestBed } from '@angular/core/testing';

import { InteresCompuestoPropioService } from './interes-compuesto-propio.service';

describe('InteresCompuestoPropioService', () => {
  let service: InteresCompuestoPropioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteresCompuestoPropioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
