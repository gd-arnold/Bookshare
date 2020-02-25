import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  get isAuth() { return this.authService.isAuth; }

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

}
