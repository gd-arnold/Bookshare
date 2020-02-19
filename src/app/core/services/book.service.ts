import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IBook } from 'src/app/components/shared/interfaces/book';
import { Router } from '@angular/router';

const url = "https://bookshare-rest-api.herokuapp.com";
const urlPrivate = "https://bookshare-rest-api.herokuapp.com/private";


@Injectable({
  providedIn: 'root'
})
export class BookService {

  searchedBooks: IBook[];
  userBooks: IBook[];

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  searchBook(searchTitle: string) {
    this.http.get<IBook[]>(`${url}/search-book?search=${searchTitle}`).subscribe(books => {
      this.searchedBooks = books;
    })
  }

  addBook(book: IBook) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    this.http.post<IBook>(`${urlPrivate}/add-book`, book, httpOptions).subscribe(() => {
      this.router.navigate(['/book/add']);
    })
  }

  fetchAllUserBooks() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    this.http.get<IBook[]>(`${urlPrivate}/user-books`, httpOptions).subscribe(books => {
      this.userBooks = books;
    });
  }
}
