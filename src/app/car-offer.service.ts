import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarOffer, CarOfferRequest } from './car-offer.model';

import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarOfferService {

  constructor(private http: HttpClient) { }

  getPaginatedCarOffers(page: number) {
    return this.http.get<CarOffer[]>(`${environment.apiUrl}/offers?page=${page}`);
  }

  getCarOfferById(id: number) {
    return this.http.get<CarOffer>(`${environment.apiUrl}/offers/${id}`)
  }

  deleteOffer(id: number) {
    return this.http.delete(`${environment.apiUrl}/offers/${id}`)
  }

  createOffer(offer: CarOfferRequest) {
    return this.http.post(`${environment.apiUrl}/offers`, offer)
  }

}
