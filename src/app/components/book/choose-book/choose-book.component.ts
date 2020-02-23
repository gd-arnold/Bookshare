import { Component, OnInit } from '@angular/core';
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
export class ChooseBookComponent implements OnInit {

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
    })
    let requestId = this.route.snapshot.paramMap.get('id');
    this.userService.fetchRequestById(requestId);
    this.userService.requestChanged.subscribe((request) => {

      if (request.isAccepted) {
        this.router.navigate(['/']);
      } else if (request.receiver.id === this.currentUserData.id) {
        this.request = request;
      } else {
        this.router.navigate(['/']);
      }
    })
  }

  chooseBook(id: string) {
    this.bookService.chooseBook(this.request.id, id);
  }

}
