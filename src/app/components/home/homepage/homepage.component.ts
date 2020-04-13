import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { BookService } from 'src/app/core/services/book.service';
import { IBook } from '../../shared/interfaces/book';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {

  userBooks: IBook[];
  userBooksSub: Subscription;

  get isAuth() { return this.authService.isAuth; }

  constructor(
    private authService: AuthService,
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.authService.isAuth) {
      this.bookService.fetchAllUserBooks();
      this.userBooksSub = this.bookService.booksChanged.subscribe((books) => {
        if (books.length < 3) {
          this.router.navigate(['book/register/add']);
        }
      })
    }
  }

  ngOnDestroy() {
    if (this.authService.isAuth) {
      this.userBooksSub.unsubscribe();
      this.bookService.cancelSubscriptions();
    }
  }

}
