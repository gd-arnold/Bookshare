import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  get users() { return this.userService.users; }

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.fetchAllUsersBasicData();
  }

}
