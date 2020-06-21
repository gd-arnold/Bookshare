import { Routes, RouterModule } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { ChooseBookComponent } from './choose-book/choose-book.component';
import { RequestInfoComponent } from './request-info/request-info.component';
import { AddBookRegComponent } from './add-book-reg/add-book-reg.component';
import { AdminRequestInfoComponent } from './admin-request-info/admin-request-info.component';
import { AdminGuard } from 'src/app/core/guards/admin.guard';


const routes: Routes = [
  {
    path: 'book',
    children: [
      {
        path: 'library',
        component: AddBookComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':id',
        component: BookDetailComponent
      },
      {
        path: 'choose/request/:id',
        component: ChooseBookComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'info/request/:id',
        component: RequestInfoComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'register/add',
        component: AddBookRegComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admin/request/:id',
        component: AdminRequestInfoComponent,
        canActivate: [AuthGuard, AdminGuard]
      }
    ]
  }
];

export const BookRoutingModule = RouterModule.forChild(routes);