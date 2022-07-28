import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarOffer, CarOfferRequest } from './car-offer.model';

import { environment } from './../environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CarOfferService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getPaginatedCarOffers(page: number) {
    return this.http.get<CarOffer[]>(`${environment.apiUrl}/offers?page=${page}`);
  }

  getCarOfferById(id: number) {
    return this.http.get<CarOffer>(`${environment.apiUrl}/offers/${id}`)
  }

  deleteOffer(id: number) {

    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set("Authorization", `Bearer ${this.authService.getToken()}`);

    return this.http.delete(`${environment.apiUrl}/offers/${id}`, { headers: headers })
  }

  createOffer(offer: CarOfferRequest) {

    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set("Authorization", `Bearer ${this.authService.getToken()}`);

    return this.http.post(`${environment.apiUrl}/offer`, offer, { headers: headers })
  }

  // uloadFilesToOffer()


}
