import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/core/services/book.service';
import { IUser } from '../../shared/interfaces/user';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-most-exchanged-books',
  templateUrl: './most-exchanged-books.component.html',
  styleUrls: ['./most-exchanged-books.component.css']
})
export class MostExchangedBooksComponent implements OnInit {

  currentUserData: IUser;
  currentUserDataSub: Subscription;

  get books() { return this.bookService.mostExchangedBooks };

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.bookService.fetchMostExchangedBooks();
  }

}
