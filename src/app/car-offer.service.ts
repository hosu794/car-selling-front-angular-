import { HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarOffer, CarOfferRequest, CarOfferResponse } from './car-offer.model';

import { environment } from './../environments/environment';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarOfferService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getPaginatedCarOffers(page: number) {

    return this.http.get<CarOffer[]>(`${environment.apiUrl}/offers?page=${page - 1}`);
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

    return this.http.post<CarOfferResponse>(`${environment.apiUrl}/offer`, offer, { headers: headers })
  }

  uploadFile(file: File, offerId: number): Observable<HttpEvent<any>> {

    const headers = new HttpHeaders()
      .set('enctype', 'multipart/form-data')
      .set('Access-Control-Allow-Origin', '*')
      .set("Authorization", `Bearer ${this.authService.getToken()}`);

    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const req = new HttpRequest('POST', `${environment.apiUrl}/offer/upload/image/${offerId}`, formData, {
      reportProgress: true,
      responseType: 'json',
      headers: headers
    });

    return this.http.request(req);
  }


}
