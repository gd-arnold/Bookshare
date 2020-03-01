import { Component, OnInit } from '@angular/core';
import { IUser } from '../../shared/interfaces/user';
import { Subscription } from 'rxjs';
import { IRequest } from '../../shared/interfaces/request';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-request-info',
  templateUrl: './request-info.component.html',
  styleUrls: ['./request-info.component.css']
})
export class RequestInfoComponent implements OnInit {

  currentUserData: IUser;
  currentUserDataSub: Subscription;

  request: IRequest;
  requestSub: Subscription;

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

      let requestId = this.route.snapshot.paramMap.get('id');
      this.userService.fetchRequestById(requestId);
      this.userService.requestChanged.subscribe((request) => {
        if (request.requester.id === this.currentUserData.id && !request.isAccepted) {
          this.router.navigate(["/"]);
        } else {
          this.request = request;
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

}
