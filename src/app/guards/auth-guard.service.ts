import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {


  constructor(private userService: UserService, private router: Router) {
    this.userService = userService;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    this.userService.getCurrentUser().subscribe(response => {
      return true;
    }, error => {

      this.router.navigate(["login"], { queryParams: { retUrl: route.url } });
      return false;

    })

    return true;

  }

}