import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { User, UserReqisterRequest, UserResponse } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getAll() {
    return this.http.get<UserResponse[]>("http://localhost:1323/users");
  }

  register(user: UserReqisterRequest) {
    return this.http.post("http://localhost:1323/register/user", user);
  }

  getCurrentUser() {

    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set("Authorization", `Bearer ${this.authService.getToken()}`);

    return this.http.get<any>("http://localhost:1323/user/current", { headers: headers })
  }

}
