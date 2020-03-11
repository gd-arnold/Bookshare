import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from 'src/app/core/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBook } from '../../shared/interfaces/book';

@Component({
  selector: 'app-user-books-reg',
  templateUrl: './user-books-reg.component.html',
  styleUrls: ['./user-books-reg.component.css']
})
export class UserBooksRegComponent implements OnInit, OnDestroy {

  userBooks: IBook[];
  userBooksSub: Subscription;

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.bookService.fetchAllUserBooks();
    this.userBooksSub = this.bookService.booksChanged.subscribe((books) => {
      this.userBooks = books;
    })
  }

  removeBookHandler(book) {
    this.bookService.removeBook(book);
  }

  ngOnDestroy() {
    this.userBooksSub.unsubscribe();
    this.bookService.cancelSubscriptions();
  }

}
