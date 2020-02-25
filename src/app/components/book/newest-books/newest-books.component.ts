import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/core/services/book.service';

@Component({
  selector: 'app-newest-books',
  templateUrl: './newest-books.component.html',
  styleUrls: ['./newest-books.component.css']
})
export class NewestBooksComponent implements OnInit {

  get books() { return this.bookService.newestBooks }

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.bookService.fetchNewestBooks();
  }

}
