import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  sendMessageFormHandler(data) {
    this.userService.sendMessage(data);
  }

}
