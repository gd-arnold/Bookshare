import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { IUser } from '../../shared/interfaces/user';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/core/services/book.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  users: IUser[];
  usersDataSub: Subscription;

  searchedUsers: IUser[];

  get bookSuggestions() { return this.bookService.bookSuggestions; }
  get messages() { return this.userService.messages; }

  constructor(private userService: UserService,
              private bookService: BookService) { }

  ngOnInit() {
    this.userService.fetchAllUsersBasicData();
    this.bookService.fetchAllSuggestions();
    this.userService.fetchAllMessages();
    this.searchedUsers = this.users;
    this.usersDataSub = this.userService.usersChanged.subscribe((users) => {
      this.users = users;
      this.searchedUsers = users;
    })
  }

  searchUser(event) {
    let searchedName = event.target.value.toLowerCase();
    
    this.searchedUsers = this.users.filter(user => this.getFullName(user).toLowerCase().indexOf(searchedName) !== -1);
  } 

  getFullName(user) {
    return user["firstName"] + " " + user["lastName"];
  }

}
