import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserResponse } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clone-car-seriice';

  public isUserLogged: boolean = false;
  public currentUser: UserResponse | null = null

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCurrentUser()

    this.route.queryParamMap.subscribe(params => {
      console.log('Has Params some', params);
      if (params.has('isLogged')) this.getCurrentUser()
    })
  }

  getCurrentUser(): void {

    this.userService.getCurrentUser().subscribe((data) => {
      this.isUserLogged = true;
      this.currentUser = data;
    })

  }
}

