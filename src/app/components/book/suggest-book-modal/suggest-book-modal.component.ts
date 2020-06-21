import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/core/services/book.service';

@Component({
  selector: 'app-suggest-book-modal',
  templateUrl: './suggest-book-modal.component.html',
  styleUrls: ['./suggest-book-modal.component.css']
})
export class SuggestBookModalComponent implements OnInit {

  constructor(private bookService: BookService) { }

  ngOnInit() {
  }

  suggestBookFormHandler(data) {
    this.bookService.suggestBook(data);
  }

}
