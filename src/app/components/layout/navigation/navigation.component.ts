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

  currentUserData: IUser;
  currentUserDataSub: Subscription;
  isAdmin: boolean;

  constructor(
    private authService: AuthService
  ) { }

  get isAuth() { return this.authService.isAuth; }
  
  ngOnInit() {
    if (this.isAuth) {
      this.authService.getCurrentUserBasicData();
      this.currentUserDataSub = this.authService.currentUserChanged.subscribe((user) => {
        this.currentUserData = user;
        this.isAdmin = this.currentUserData.roles.includes("ADMIN");
      });
    }
  }

  logout() {
    this.authService.logoutUser();
  }

}
