import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { IUser } from '../../shared/interfaces/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  get isAuth() { return this.authService.isAuth; }
  get isAdmin() { return this.authService._currentUserData ? this.authService._currentUserData.roles.includes("ADMIN") : false }
  get userId() { return this.authService._currentUserData ? this.authService._currentUserData.id : 0 }

  ngOnInit() {
  }

  logout() {
    this.authService.logoutUser();
  }

}
