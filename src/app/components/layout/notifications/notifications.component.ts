import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { IRequest } from '../../shared/interfaces/request';
import { IUser } from '../../shared/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  unreadNotificationsCount: number;
  unreadNotificationsCountSub: Subscription;
  currentUserData: IUser;
  currentUserDataSub: Subscription;

  isClicked = false;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  get requests() { return this.userService.requests; }

  ngOnInit() {
    this.authService.getCurrentUserBasicData();
    this.currentUserDataSub = this.authService.currentUserChanged.subscribe((user) => {
      this.currentUserData = user;
    })
    setInterval(() => {
      if (this.authService.isAuth) {
        this.userService.fetchUnreadNotificationsCount();
        this.unreadNotificationsCountSub = this.userService.unreadNotificationsCountChanged.subscribe((count) => {
          this.unreadNotificationsCount = count;
        })
      } else { return; }
    }, 2000);

  }

  getUserNotifications() {
    if (this.isClicked) {
      this.userService.requests = [];
      this.isClicked = false;
    } else {
      this.userService.readUnreadNotificationsforCurrentUser();
      this.userService.fetchNotificationsForCurrentUser();
      this.isClicked = true;
    }
  }

  isReceiver(request: IRequest) {
    return request.receiver.id === this.currentUserData.id;
  }

  requestInfo(id: string) {
    this.userService.fetchRequestInfoById(id);
  }

  ngOnDestroy() {
    this.unreadNotificationsCountSub.unsubscribe();
    this.currentUserDataSub.unsubscribe();
    this.userService.cancelSubscriptions();
  }
}
