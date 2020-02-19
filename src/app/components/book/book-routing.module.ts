import { Routes, RouterModule } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';


const routes: Routes = [
  {
    path: 'book',
    children: [
        {
            path: 'add',
            component: AddBookComponent
        }
    ]
  }
];

export const AuthRoutingModule = RouterModule.forChild(routes);