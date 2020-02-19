import { Component } from '@angular/core';
import { BookService } from 'src/app/core/services/book.service';

@Component({
  selector: 'app-search-book-engine',
  templateUrl: './search-book-engine.component.html',
  styleUrls: ['./search-book-engine.component.css']
})
export class SearchBookEngineComponent {

  get searchedBooks() { return this.bookService.searchedBooks; }

  constructor(private bookService: BookService) { }

  search(event) {
    let searchTitle = event.target.value;
    this.bookService.searchBook(searchTitle);
  }

}
