import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUser } from '../../shared/interfaces/user';
import { Subscription, Subject } from 'rxjs';
import { IRequest } from '../../shared/interfaces/request';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-request-info',
  templateUrl: './request-info.component.html',
  styleUrls: ['./request-info.component.css']
})
export class RequestInfoComponent implements OnInit, OnDestroy {

  currentUserData: IUser;
  currentUserDataSub: Subscription;

  get request() {return this.userService.request};
  // get requestId() { return this.route.snapshot.paramMap.get('id'); };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.getCurrentUserBasicData();
    this.currentUserDataSub = this.authService.currentUserChanged.subscribe((user) => {
      this.currentUserData = user;
      this.userService.requestChanged.subscribe(() => {
        if (this.request.requester.id === this.currentUserData.id && !this.request.isAccepted) {
          this.router.navigate(["/"]);
        }
      })
    })
  }

  isRequester() {
    return this.request.requester.id === this.currentUserData.id;
  }

  isReceiver() {
    return this.request.receiver.id === this.currentUserData.id;
  }

  ngOnDestroy() {
    this.userService.cancelSubscriptions();
    this.userService.request = null;
  }

}
