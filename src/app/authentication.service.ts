import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as moment from "moment";
import { User } from './user.model';
import { LoginResponse } from './login-response.model';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from './../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) {

  }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/login/user`, { email, password }).pipe(map(user => {
      this.setSession(user.token)
    }))

    // subscribe(response => this.setSession(response.token));
  }


  private setSession(authResult: string) {
    const expiresAt = moment().add(60 * 60 * 24, 'second');

    localStorage.setItem('id_token', authResult);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  getToken() {
    return localStorage.getItem("id_token")
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.router.navigate(["/"])
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration: any = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

}
