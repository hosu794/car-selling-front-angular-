import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserReqisterRequest, UserResponse } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<UserResponse[]>("http://localhost:1323/users");
  }

  register(user: UserReqisterRequest) {
    return this.http.post("http://localhost:1323/register/user", user);
  }

  getCurrentUser() {
    return this.http.get("http://localhost:1323/user/current")
  }

}
