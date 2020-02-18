import { Component } from '@angular/core';
import { BookService } from 'src/app/core/services/book.service';

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.css']
})
export class SearchEngineComponent {

  get books() { return this.bookService.books; }

  constructor(private bookService: BookService) { }

  search(event) {
    let searchTitle = event.target.value;
    this.bookService.searchBook(searchTitle);
  }

}
