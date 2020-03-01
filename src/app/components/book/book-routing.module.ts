import { Routes, RouterModule } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { ChooseBookComponent } from './choose-book/choose-book.component';
import { RequestInfoComponent } from './request-info/request-info.component';


const routes: Routes = [
  {
    path: 'book',
    children: [
      {
        path: 'add',
        component: AddBookComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':id',
        component: BookDetailComponent
      },
      {
        path: 'choose/request/:id',
        component: ChooseBookComponent
      },
      {
        path: 'info/request/:id',
        component: RequestInfoComponent
      }
    ]
  }
];

export const BookRoutingModule = RouterModule.forChild(routes);