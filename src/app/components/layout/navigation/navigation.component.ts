import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  get isAuth() { return this.authService.isAuth; }

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logoutUser();
  }

}
