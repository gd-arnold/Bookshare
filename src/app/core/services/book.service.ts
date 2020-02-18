import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBook } from 'src/app/components/shared/interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  books: IBook[];

  constructor(private http: HttpClient) { }

  searchBook(searchTitle: string) {
    this.http.get<IBook[]>("https://bookshare-rest-api.herokuapp.com/search-book?search=" + searchTitle).subscribe(books => {
      this.books = books;
    });

  }
}
