import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IBook } from 'src/app/components/shared/interfaces/book';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from './auth.service';

const url = "https://bookshare-rest-api.herokuapp.com";
const urlPrivate = "https://bookshare-rest-api.herokuapp.com/private";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  searchedBooks: IBook[];
  userBooks: IBook[];
  book: IBook;
  booksChanged = new Subject<IBook[]>();

  private _booksForUser: IBook[] = [];
  private _bookSubscriptions: Subscription[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getHttpOptions(token) {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  searchBook(searchTitle: string) {
    this.http.get<IBook[]>(`${url}/search-book?search=${searchTitle}`).subscribe(books => {
      this.searchedBooks = books;
    })
  }

  addBook(book: IBook) {
    this.http.post<IBook>(`${urlPrivate}/add-book`, book, this.getHttpOptions(localStorage.getItem('token')))
      .subscribe(() => {
        this.fetchAllUserBooks();
      })
  }

  requestBook(book: IBook) {
    this.http.post<IBook>(`${urlPrivate}/request-book`, book, this.getHttpOptions(localStorage.getItem('token')))
      .subscribe(() => {
        this.authService.getCurrentUserBasicData();
      }, err => (alert("Не съществува потребител с такава книга.")));
  }

  fetchAllUserBooks() {
    this._bookSubscriptions.push(this.http.get<IBook[]>(`${urlPrivate}/user-books`, this.getHttpOptions(localStorage.getItem('token'))).subscribe(books => {
      this._booksForUser = books;
      this.booksChanged.next([...this._booksForUser]);
    }));
  }

  fetchBookById(id: string) {
    this.http.get<IBook>(`${url}/book/${id}`).subscribe(book => {
      this.book = book;
    });
  }

  chooseBook(requestId: number, bookId: string) {
    let data = {
      request_id: requestId,
      book_id: bookId
    };

    this.http.post(`${urlPrivate}/accept-book`, data, this.getHttpOptions(localStorage.getItem("token")))
      .subscribe(() => { console.log("accepted"); });
  }

  cancelSubscriptions() {
    this._bookSubscriptions.forEach((s) => s.unsubscribe());
  }
}
