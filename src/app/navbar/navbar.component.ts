import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { UserResponse } from '../user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {

  }

  logout() {
    this.authService.logout();
    this.currentUser = null;
    this.isLoggedIn = false;
    this.isLoggedInEmitter.emit(false);
    this.currentUserEmitter.emit(null)
  }

  ngOnChanges(changes: SimpleChanges) {

    // changes.prop contains the old and the new value...
    console.log(this.isLoggedIn);
    console.log(this.currentUser);
  }

  @Input() isLoggedIn!: boolean;
  @Input() currentUser!: UserResponse | null;

  @Output() isLoggedInEmitter = new EventEmitter<boolean>();
  @Output() currentUserEmitter = new EventEmitter<UserResponse | null>();

}
