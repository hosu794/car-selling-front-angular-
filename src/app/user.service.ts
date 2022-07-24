import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { User, UserReqisterRequest, UserResponse } from './user.model';
import { environment } from './../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getAll() {
    return this.http.get<UserResponse[]>(`${environment.apiUrl}/users`);
  }

  register(user: UserReqisterRequest) {
    return this.http.post(`${environment.apiUrl}/register/user`, user);
  }

  getCurrentUser() {

    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set("Authorization", `Bearer ${this.authService.getToken()}`);

    return this.http.get<any>(`${environment.apiUrl}/user/current`, { headers: headers })
  }

}
