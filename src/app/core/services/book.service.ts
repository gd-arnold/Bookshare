import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IBook } from 'src/app/components/shared/interfaces/book';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

const url = "https://bookshare-rest-api.herokuapp.com";
const urlPrivate = "https://bookshare-rest-api.herokuapp.com/private";

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
};

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
    private http: HttpClient
  ) { }

  searchBook(searchTitle: string) {
    this.http.get<IBook[]>(`${url}/search-book?search=${searchTitle}`).subscribe(books => {
      this.searchedBooks = books;
    })
  }

  addBook(book: IBook) {
    this.http.post<IBook>(`${urlPrivate}/add-book`, book, httpOptions).subscribe(() => {
      this.fetchAllUserBooks();
    })
  }

  fetchAllUserBooks() {
    this._bookSubscriptions.push(this.http.get<IBook[]>(`${urlPrivate}/user-books`, httpOptions).subscribe(books => {
      this._booksForUser = books;
      this.booksChanged.next([...this._booksForUser]);
    }));
  }

  fetchBookById(id: string) {
    this.http.get<IBook>(`${url}/book/${id}`).subscribe(book => {
      this.book = book;
    });
  }

  cancelSubscriptions() {
    this._bookSubscriptions.forEach((s) => s.unsubscribe());
  }
}
