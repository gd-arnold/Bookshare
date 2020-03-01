import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { IUser } from '../../shared/interfaces/user';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { IRequest } from '../../shared/interfaces/request';
import { BookService } from 'src/app/core/services/book.service';

@Component({
  selector: 'app-choose-book',
  templateUrl: './choose-book.component.html',
  styleUrls: ['./choose-book.component.css']
})
export class ChooseBookComponent implements OnInit, OnDestroy {

  currentUserData: IUser;
  currentUserDataSub: Subscription;

  request: IRequest;
  requestSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.authService.getCurrentUserBasicData();
    this.currentUserDataSub = this.authService.currentUserChanged.subscribe((user) => {
      this.currentUserData = user;

      let requestId = this.route.snapshot.paramMap.get('id');
      this.userService.fetchRequestById(requestId);
      this.userService.requestChanged.subscribe((request) => {
        this.request = request;
      })
    })
  }

  chooseBook(id: string) {
    this.bookService.chooseBook(this.request.id, id);
    this.router.navigate([`book/info/request/${this.request.id}`]);
  }

  ngOnDestroy() {
    this.userService.cancelSubscriptions();
  }

}
