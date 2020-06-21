import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-admin-request-info',
  templateUrl: './admin-request-info.component.html',
  styleUrls: ['./admin-request-info.component.css']
})
export class AdminRequestInfoComponent implements OnInit {

  get request() { return this.userService.request; }

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

}
