import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUser } from '../../shared/interfaces/user';
import { Subscription } from 'rxjs';
import { IRequest } from '../../shared/interfaces/request';
import { ActivatedRoute, Params } from '@angular/router';
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
  routerSubscription: Subscription;

  request: IRequest = null;
  get requestId() { return this.route.snapshot.params["id"]; }

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.routerSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.authService.getCurrentUserBasicData();
        this.currentUserDataSub = this.authService.currentUserChanged.subscribe((user) => {
          this.currentUserData = user;
          this.userService.fetchRequestInfoById(this.requestId);

          this.userService.requestChanged.subscribe((request) => {
            if (request.requestedBook && request.id == this.requestId) {
              this.request = request;
            }
          })
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
    // this.userService.cancelSubscriptions();
    // this.userService.request = null;
    this.routerSubscription.unsubscribe();
    // this.userService.requestChanged.unsubscribe(); 
  }

}
