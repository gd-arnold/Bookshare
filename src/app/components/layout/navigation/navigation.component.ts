import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

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

  ngOnInit() {
  }

  logout() {
    this.authService.logoutUser();
  }

}
