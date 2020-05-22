import { Component, OnInit } from '@angular/core';
import { IUser } from '../../shared/interfaces/user';
import { of, timer, Subject, Subscription } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  currentUserData: IUser;
  currentUserDataSub: Subscription;

  fistName: string;
  firstNameChanged: Subject<string> = new Subject<string>();
  lastName: string;
  lastNameChanged: Subject<string> = new Subject<string>();
  email: string;
  emailChanged: Subject<string> = new Subject<string>();

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.authService.getCurrentUserBasicData();
    this.currentUserDataSub = this.authService.currentUserChanged.subscribe((user) => {
      this.currentUserData = user;
      console.log(this.currentUserData);
    });

    this.firstNameChanged.pipe(debounceTime(1000))
      .subscribe(firstName => {
        this.userService.updateUser(firstName, null, null);
      });

    this.lastNameChanged.pipe(debounceTime(1000))
      .subscribe(lastName => {
        this.userService.updateUser(null, lastName, null);
      });  

    this.emailChanged.pipe(debounceTime(1000))
      .subscribe(email => {
        this.userService.updateUser(null, null, email);
      });   
  };

  updateUserFirstName(firstName: string) {
    this.firstNameChanged.next(firstName);
  }

  updateUserLastName(lastName: string) {
    this.lastNameChanged.next(lastName);
  }

  updateUserEmail(email: string) {
    this.emailChanged.next(email);
  }
}
