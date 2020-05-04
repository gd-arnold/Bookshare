import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/core/services/book.service';
import { IBook } from '../../shared/interfaces/book';
import { AuthService } from 'src/app/core/services/auth.service';
import { IUser } from '../../shared/interfaces/user';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit, OnDestroy {

  currentUserData: IUser;
  currentUserDataSub: Subscription;

  get book() { return this.bookService.book; }
  get bookId() { return this.router.snapshot.paramMap.get('id'); };
  get isSuccessfullyRequestedId() { return this.bookService.isSuccesfullyRequestedId }

  constructor(
    private router: ActivatedRoute,
    private bookService: BookService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.bookService.fetchBookById(this.bookId);
    if (this.authService.isAuth) {
      this.authService.getCurrentUserBasicData();
      this.currentUserDataSub = this.authService.currentUserChanged.subscribe((user) => {
        this.currentUserData = user;
      })
    }
  }

  isOwner() {
    return this.book.users.some(user => user["id"] === this.currentUserData.id)
  }

  isRequested() {
    return this.currentUserData.requests.some(request => request["requestedBook"]["id"] === this.book.id);
  }

  ngOnDestroy() {
    if (this.authService.isAuth) {
      this.currentUserDataSub.unsubscribe();
      this.authService.cancelSubscriptions();
    }
  }

}