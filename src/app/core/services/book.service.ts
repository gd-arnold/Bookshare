import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IBook } from 'src/app/components/shared/interfaces/book';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
declare var $: any;

const url = "https://bookshare-rest-api.herokuapp.com";
const urlPrivate = "https://bookshare-rest-api.herokuapp.com/private";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  searchedBooks: IBook[];
  userBooks: IBook[];
  mostExchangedBooks: IBook[];
  newestBooks: IBook[];
  book: IBook;
  booksChanged = new Subject<IBook[]>();
  isSuccesfullyRequestedId: string;
  suggestedBookTitle: string;

  private _booksForUser: IBook[] = [];
  private _bookSubscriptions: Subscription[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
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

  removeBook(book: IBook) {
    this.http.post<IBook>(`${urlPrivate}/remove-book`, book, this.getHttpOptions(localStorage.getItem('token')))
      .subscribe(() => {
        this.fetchAllUserBooks();
      })
  }

  requestBook(bookId: string, addressId: string) {
    let data = {
      bookId: bookId,
      addressId: addressId
    }

    this.http.post<IBook>(`${urlPrivate}/book-request`, data, this.getHttpOptions(localStorage.getItem('token')))
      .subscribe(() => {
        this.authService.getCurrentUserBasicData();
        this.isSuccesfullyRequestedId = bookId;
      }, err => alert("Не съществува потребител, който предлага тази книга."));
  }

  fetchAllUserBooks() {
    this._bookSubscriptions.push(this.http.get<IBook[]>(`${urlPrivate}/user-books`, this.getHttpOptions(localStorage.getItem('token'))).subscribe(books => {
      this._booksForUser = books;
      this.booksChanged.next([...this._booksForUser]);
    }));
  }

  fetchBookById(id: string) {
    this.http.get<IBook>(`${this.authService.isAuth ? urlPrivate : url}/book/${id}`, this.getHttpOptions(localStorage.getItem('token'))).subscribe(book => {
      this.book = book;
    });
  }

  chooseBook(requestId: string, bookId: string, addressId: string) {
    let data = {
      requestId: requestId,
      bookId: bookId,
      addressId: addressId
    };

    this.http.post(`${urlPrivate}/accept-book`, data, this.getHttpOptions(localStorage.getItem("token")))
      .subscribe(() => {
        this.router.navigate([`book/info/request/${requestId}`]);
      });
  }

  fetchMostExchangedBooks() {
    this.http.get<IBook[]>(`${url}/most-exchanged-books`)
      .subscribe((books) => { this.mostExchangedBooks = books; });
  }

  fetchNewestBooks() {
    this.http.get<IBook[]>(`${url}/newest-books`)
    .subscribe((books) => { this.newestBooks = books; });
  }

  cancelRequest(id: string) {
    let data = {
      id: id
    };

    this.http.post(`${urlPrivate}/cancel-request`, data, this.getHttpOptions(localStorage.getItem("token"))).subscribe(() => {
      this.authService.getCurrentUserBasicData();
      $(`#cancelModal${id}`).modal('hide');
    })
  }

  suggestBook(data) {
    this.http.post(`${urlPrivate}/suggest-book`, data, this.getHttpOptions(localStorage.getItem("token"))).subscribe(() => {
      $(`#suggestBookModal`).modal('hide');
      this.suggestedBookTitle = data["title"];
    })
  }

  cancelSubscriptions() {
    this._bookSubscriptions.forEach((s) => s.unsubscribe());
  }
}
