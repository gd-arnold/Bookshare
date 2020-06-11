import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUser } from '../../shared/interfaces/user';
import { of, timer, Subject, Subscription } from 'rxjs';
import { debounce, debounceTime, last } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { BookService } from 'src/app/core/services/book.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Params } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  routerSubscribtion: Subscription;

  currFirstName: string;
  currLastName: string;
  currEmail: string;

  inPending: boolean = true;

  notAcceptedReceives: Array<any>;
  notAcceptedRequests: Array<any>;
  successfulRequests: Array<any>;

  userData: IUser;
  userDataSub: Subscription;

  currUserData: IUser;
  currUserDataSub: Subscription;

  fistName: string;
  firstNameChanged: Subject<string> = new Subject<string>();
  lastName: string;
  lastNameChanged: Subject<string> = new Subject<string>();
  email: string;
  emailChanged: Subject<string> = new Subject<string>();

  get userId() { return this.route.snapshot.paramMap.get('id'); };

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private bookService: BookService,
    private route: ActivatedRoute
  ) { }

  get isPasswordChanged() { return this.userService.isPasswordChanged };

  ngOnInit() {
    this.routerSubscribtion = this.route.params.subscribe(
      (params: Params) => {
        this.authService.getCurrentUserBasicData();
        this.currUserDataSub = this.authService.currentUserChanged.subscribe((currUser) => {
          this.currUserData = currUser;
        })
        this.authService.getUserBasicData(params["id"])
        this.userDataSub = this.authService.userChanged.subscribe((user) => {
          this.userData = user;

          this.currFirstName = this.userData.firstName;
          this.currLastName = this.userData.lastName;
          this.currEmail = this.userData.email;

          this.notAcceptedReceives = this.userData["receipts"].filter(receipt => receipt["isAccepted"] === false);
          this.notAcceptedRequests = this.userData["requests"].filter(request => request["isAccepted"] === false);

          let successfulRequestsReceiver = this.userData["receipts"].filter(receipt => receipt["isAccepted"] === true);
          let successfulRequestsRequester = this.userData["requests"].filter(request => request["isAccepted"] === true);

          Array.prototype.push.apply(successfulRequestsReceiver, successfulRequestsRequester);

          successfulRequestsReceiver.sort(function (a, b) {
            if (a["id"] < b["id"]) {
              return 1;
            }
            return 0;
          });

          this.successfulRequests = successfulRequestsReceiver;
        });

        this.firstNameChanged.pipe(debounceTime(1050))
          .subscribe(firstName => {
            this.userService.updateUser(firstName, null, null, this.userId);
          });

        this.lastNameChanged.pipe(debounceTime(1050))
          .subscribe(lastName => {
            this.userService.updateUser(null, lastName, null, this.userId);
          });

        this.emailChanged.pipe(debounceTime(1050))
          .subscribe(email => {
            this.userService.updateUser(null, null, email, this.userId);
          });
      })
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

  requestInfo(id: string) {
    this.userService.fetchRequestInfoById(id);
  }

  cancelRequest(id: string) {
    this.bookService.cancelRequest(id, this.userData.id);
  }

  changePasswordHandler(data) {
    this.userService.updatePassword(data);
    $(`#changePasswordModal`).modal('hide');
  }

  ngOnDestroy() {
    this.routerSubscribtion.unsubscribe();
    this.userDataSub.unsubscribe();
  }
}
