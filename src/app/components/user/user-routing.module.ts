import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';


const routes: Routes = [
  {
    path: 'user',
    children: [
        {
            path: 'profile',
            component: UserProfileComponent,
            canActivate: [AuthGuard]
        }
    ]
  }
];

export const UserRoutingModule = RouterModule.forChild(routes);