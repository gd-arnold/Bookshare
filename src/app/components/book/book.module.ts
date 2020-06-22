import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBookComponent } from './add-book/add-book.component';
import { LayoutModule } from '../layout/layout.module';
import { BookRoutingModule } from './book-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserBooksComponent } from './user-books/user-books.component';
import { AddBookEngineComponent } from './add-book-engine/add-book-engine.component';
import { SearchBookEngineComponent } from './search-book-engine/search-book-engine.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { RouterModule } from '@angular/router';
import { ChooseBookComponent } from './choose-book/choose-book.component';
import { MostExchangedBooksComponent } from './most-exchanged-books/most-exchanged-books.component';
import { NewestBooksComponent } from './newest-books/newest-books.component';
import { Pipe, PipeTransform } from '@angular/core';
import { FormatTitle } from 'src/app/core/pipes/format-title.pipe';
import { RequestInfoComponent } from './request-info/request-info.component';
import { AddBookRegComponent } from './add-book-reg/add-book-reg.component';
import { UserBooksRegComponent } from './user-books-reg/user-books-reg.component';
import { FormsModule } from '@angular/forms';
import { DeliveryInfoModalComponent } from './delivery-info-modal/delivery-info-modal.component';
import { AdminRequestInfoComponent } from './admin-request-info/admin-request-info.component';
import { SuggestBookModalComponent } from './suggest-book-modal/suggest-book-modal.component';
import { FormatRequestTitle } from 'src/app/core/pipes/format-request-title';

@NgModule({
  declarations: [
    AddBookComponent,
    UserBooksComponent, 
    AddBookEngineComponent, 
    SearchBookEngineComponent, 
    BookDetailComponent, 
    ChooseBookComponent, 
    MostExchangedBooksComponent, 
    NewestBooksComponent,
    FormatTitle,
    RequestInfoComponent,
    AddBookRegComponent,
    UserBooksRegComponent,
    DeliveryInfoModalComponent,
    AdminRequestInfoComponent,
    SuggestBookModalComponent,
    FormatRequestTitle
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    LayoutModule,
    SharedModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    AddBookComponent,
    AddBookRegComponent,
    SearchBookEngineComponent,
    MostExchangedBooksComponent,
    NewestBooksComponent
  ]
})
export class BookModule { }
