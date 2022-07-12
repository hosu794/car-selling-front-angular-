import { TestBed } from '@angular/core/testing';

import { CarOfferService } from './car-offer.service';

describe('CarOfferService', () => {
  let service: CarOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
