import { Routes, RouterModule } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { BookDetailComponent } from './book-detail/book-detail.component';


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
      }
    ]
  }
];

export const BookRoutingModule = RouterModule.forChild(routes);