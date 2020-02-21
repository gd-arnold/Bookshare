import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/core/services/book.service';
import { IBook } from '../../shared/interfaces/book';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  get book() { return this.bookService.book; }
  get currentUserData() { return this.authService.currentUser; }

  constructor(
    private router: ActivatedRoute,
    private bookService: BookService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    let bookId = this.router.snapshot.paramMap.get('id');
    this.bookService.fetchBookById(bookId);
    if (this.authService.isAuth) { this.authService.getCurrentUserBasicData(); }
  }

  isOwner() {
    return this.book.users.some(user => user["id"] === this.currentUserData.id)
  }

}