import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/core/services/book.service';

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.css']
})
export class UserBooksComponent implements OnInit {

  get userBooks() { return this.bookService.userBooks; }

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit() {
    setInterval(() => {
      this.bookService.fetchAllUserBooks();
    }, 100);
  }

}
