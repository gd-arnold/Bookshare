import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IBook } from 'src/app/components/shared/interfaces/book';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { IBookSuggestion } from 'src/app/components/shared/interfaces/suggestion';
import { ICategory } from 'src/app/components/shared/interfaces/category';
import { ISubcategory } from 'src/app/components/shared/interfaces/subcategory';
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
  isChosen: boolean = false;
  bookSuggestions: IBookSuggestion[];
  categories: ICategory[];
  subcategories: ISubcategory[];
  createdBook: IBook;

  private _booksForUser: IBook[] = [];
  private _bookSubscriptions: Subscription[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private userService: UserService
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
        this.userService.fetchRequestInfoById(requestId);
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

  cancelRequest(requestId: string, userId: string) {
    let data = {
      requestId: requestId,
      userId: userId
    };
    
    this.http.post(`${urlPrivate}/cancel-request`, data, this.getHttpOptions(localStorage.getItem("token"))).subscribe(() => {
      this.authService.getUserBasicData(userId);
      $(`#cancelModal${requestId}`).modal('hide');
    })
  }

  fetchAllSuggestions() {
    this.http.get<IBookSuggestion[]>(`${urlPrivate}/suggestions`, this.getHttpOptions(localStorage.getItem("token"))).subscribe( suggestions => {
      this.bookSuggestions = suggestions;
    })
  }

  fetchAllCategories() {
    this.http.get<ICategory[]>(`${urlPrivate}/all-categories`, this.getHttpOptions(localStorage.getItem("token"))).subscribe(categories => {
      this.categories = categories;
    })
  }

  fetchSubcategoriesByCategory(categoryId: string) {
    this.http.get<ISubcategory[]>(`${urlPrivate}/subcategories-by-category/${categoryId}`, this.getHttpOptions(localStorage.getItem("token"))).subscribe(subcategories => {
      this.subcategories = subcategories;
    });
  }

  createBook(data) {
    this.http.post(`${urlPrivate}/create-book`, data, this.getHttpOptions(localStorage.getItem("token"))).subscribe(() => {
      $(`#addBookModal${data["suggestionId"]}`).modal('hide');
      this.fetchAllSuggestions();
      this.createdBook = data;
    }, err => {
      console.log(err);
    })
  }

  cancelSuggestion(suggestionId: string) {
    this.http.post(`${urlPrivate}/cancel-suggestion`, {suggestionId: suggestionId}, this.getHttpOptions(localStorage.getItem("token"))).subscribe(() => {
      this.fetchAllSuggestions();  
    })
  }

  cancelSubscriptions() {
    this._bookSubscriptions.forEach((s) => s.unsubscribe());
  }
}
