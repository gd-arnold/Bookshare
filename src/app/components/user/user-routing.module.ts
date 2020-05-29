import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { SupportComponent } from './support/support.component';


const routes: Routes = [
  {
    path: 'user',
    children: [
        {
            path: 'profile',
            component: UserProfileComponent,
            canActivate: [AuthGuard]
        }, 
        {
            path: 'support',
            component: SupportComponent,
            canActivate: [AuthGuard]
        }
    ]
  }
];

export const UserRoutingModule = RouterModule.forChild(routes);