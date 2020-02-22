import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  unreadNotificationsCount: string;
  unreadNotificationsCountSub: Subscription;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    setInterval(() => {
      if (this.authService.isAuth) {
        this.userService.fetchUnreadNotificationsCount();
        this.unreadNotificationsCountSub = this.userService.unreadNotificationsCountChanged.subscribe((count) => {
          this.unreadNotificationsCount = count;
        })
      } else { return; }
    }, 200);

  }

  ngOnDestroy() {
    this.unreadNotificationsCountSub.unsubscribe();
    this.userService.cancelSubscriptions();
  }

}
