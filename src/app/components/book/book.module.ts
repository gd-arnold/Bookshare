import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBookComponent } from './add-book/add-book.component';
import { LayoutModule } from '../layout/layout.module';
import { BookRoutingModule } from './book-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserBooksComponent } from './user-books/user-books.component';
import { AddBookEngineComponent } from './add-book-engine/add-book-engine.component';
import { SearchBookEngineComponent } from './search-book-engine/search-book-engine.component';

@NgModule({
  declarations: [
    AddBookComponent,
    UserBooksComponent, 
    AddBookEngineComponent, 
    SearchBookEngineComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    LayoutModule,
    SharedModule
  ],
  exports: [
    AddBookComponent,
    SearchBookEngineComponent
  ]
})
export class BookModule { }
