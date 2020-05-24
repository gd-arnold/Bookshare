import { Component, OnDestroy } from '@angular/core';
import { BookService } from 'src/app/core/services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-book-engine',
  templateUrl: './search-book-engine.component.html',
  styleUrls: ['./search-book-engine.component.css']
})
export class SearchBookEngineComponent implements OnDestroy {

  get searchedBooks() { return this.bookService.searchedBooks; }

  constructor(
    private bookService: BookService,
    private router: Router
  ) { }

  search(event) {
    let searchTitle = event.target.value;
    this.bookService.searchBook(searchTitle);
  }

  viewBook(id: string) {
    this.bookService.searchedBooks = [];
    this.router.navigate([`book/${id}`]);
  }

  ngOnDestroy() {
    this.bookService.searchedBooks = [];
  }

}
