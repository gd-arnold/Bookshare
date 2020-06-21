import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';

import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class UserProfile implements CanActivate {

    constructor(
      private authService: AuthService,
      private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        if (this.authService._currentUserData) {
            if (this.authService._currentUserData.id == route.params["id"]) {
                return true;
            }

            if (this.authService._currentUserData.roles.includes("ADMIN")) {
                return true;
            }
        }
        this.router.navigate(['/'])
        return false;
    }

  } 