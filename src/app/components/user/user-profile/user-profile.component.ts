import { Component, OnInit } from '@angular/core';
import { IUser } from '../../shared/interfaces/user';
import { of, timer, Subject, Subscription } from 'rxjs';
import { debounce, debounceTime, last } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { BookService } from 'src/app/core/services/book.service';
declare var $: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  currFirstName: string;
  currLastName: string;
  currEmail: string;

  inPending: boolean = true;
  inPast: boolean = false;
  inRequested: boolean = false;

  notAcceptedReceives: Array<any>;
  notAcceptedRequests: Array<any>;
  successfulRequests: Array<any>;

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
    private bookService: BookService
  ) { }

  get isPasswordChanged() { return this.userService.isPasswordChanged };

  ngOnInit() {
    this.authService.getCurrentUserBasicData();
    this.currentUserDataSub = this.authService.currentUserChanged.subscribe((user) => {
      this.currentUserData = user;

      this.currFirstName = this.currentUserData.firstName;
      this.currLastName = this.currentUserData.lastName;
      this.currEmail = this.currentUserData.email;

      this.notAcceptedReceives = this.currentUserData["receipts"].filter(receipt => receipt["isAccepted"] === false);
      this.notAcceptedRequests = this.currentUserData["requests"].filter(request => request["isAccepted"] === false);
      
      let successfulRequestsReceiver = this.currentUserData["receipts"].filter(receipt => receipt["isAccepted"] === true);
      let successfulRequestsRequester = this.currentUserData["requests"].filter(request => request["isAccepted"] === true);
      
      Array.prototype.push.apply(successfulRequestsReceiver,successfulRequestsRequester);

      successfulRequestsReceiver.sort(function (firstRequest, secondRequest) {
        return parseInt(firstRequest["id"]) < parseInt(secondRequest["id"]) ? 1 : -1;
      });

      this.successfulRequests = successfulRequestsReceiver;
    });

    this.firstNameChanged.pipe(debounceTime(1050))
      .subscribe(firstName => {
        this.userService.updateUser(firstName, null, null);
      });

    this.lastNameChanged.pipe(debounceTime(1050))
      .subscribe(lastName => {
        this.userService.updateUser(null, lastName, null);
      });  

    this.emailChanged.pipe(debounceTime(1050))
      .subscribe(email => {
        this.userService.updateUser(null, null, email);
      }); 
  };

  updateUserFirstName(firstName: string) {
    if (firstName.length > 0) {
      this.firstNameChanged.next(firstName);
    } else {
      this.firstNameChanged.next(this.currFirstName);
    }
  }

  updateUserLastName(lastName: string) {
    if (lastName.length > 0) {
      this.lastNameChanged.next(lastName);
    } else {
      this.lastNameChanged.next(this.currLastName);
    }

  }

  updateUserEmail(email: string, isInvalid: boolean) {
    if (!isInvalid) {
      this.emailChanged.next(email);
    } else {
      this.emailChanged.next(this.currEmail);
    }
  }

  cancelRequest(id: string) {
    this.bookService.cancelRequest(id);
  }

  changePasswordHandler(data) {
    this.userService.updatePassword(data);
    $(`#changePasswordModal`).modal('hide');
  }
}
