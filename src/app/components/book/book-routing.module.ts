import { Routes, RouterModule } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';


const routes: Routes = [
  {
    path: 'book',
    children: [
        {
            path: 'add',
            component: AddBookComponent,
            canActivate: [AuthGuard]
        }
    ]
  }
];

export const BookRoutingModule = RouterModule.forChild(routes);