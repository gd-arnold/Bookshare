import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/core/services/book.service';
import { IBook } from '../../shared/interfaces/book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  get book() { return this.bookService.book; }

  constructor(
    private router: ActivatedRoute,
    private bookService: BookService
  ) { }

  ngOnInit() {
    let bookId = this.router.snapshot.paramMap.get('id');
    this.bookService.fetchBookById(bookId);
  }

}
