import { Component } from '@angular/core';
import { BookService } from 'src/app/core/services/book.service';
import { IBook } from '../../shared/interfaces/book';

@Component({
  selector: 'app-add-book-engine',
  templateUrl: './add-book-engine.component.html',
  styleUrls: ['./add-book-engine.component.css']
})
export class AddBookEngineComponent {

  get searchedBooks() { return this.bookService.searchedBooks; }

  constructor(private bookService: BookService) { }

  search(event) {
    let searchTitle = event.target.value;
    this.bookService.searchBook(searchTitle);
  }

  selectBookHandler(book: IBook, event) {
    event.target.parentNode.parentNode.closest('.search-engine').querySelector('input').value = "";
    this.bookService.searchedBooks = [];
    this.bookService.addBook(book);
  }

}
