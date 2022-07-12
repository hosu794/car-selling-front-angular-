import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarOffer, CarOfferRequest } from './car-offer.model';

@Injectable({
  providedIn: 'root'
})
export class CarOfferService {

  constructor(private http: HttpClient) { }

  getPaginatedCarOffers(page: number) {
    return this.http.get<CarOffer[]>(`http://localhost:1323/offers?page=${page}`);
  }

  getCarOfferById(id: number) {
    return this.http.get<CarOffer>(`http://localhost:1323/offers/${id}`)
  }

  deleteOffer(id: number) {
    return this.http.delete(`http://localhost:1323/offers/${id}`)
  }

  createOffer(offer: CarOfferRequest) {
    return this.http.post('http://localhost:1323/offers', offer)
  }

}
