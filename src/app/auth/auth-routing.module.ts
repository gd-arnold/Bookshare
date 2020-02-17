import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {
    path: 'auth',
    children: [
        {
            path: 'register',
            component: RegisterComponent
        }
    ]
  }
];

export const AuthRoutingModule = RouterModule.forChild(routes);