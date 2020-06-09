import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { AdminGuard } from 'src/app/core/guards/admin.guard';


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
            path: 'admin',
            component: AdminPanelComponent,
            canActivate: [AuthGuard, AdminGuard]
        }
    ]
  }
];

export const UserRoutingModule = RouterModule.forChild(routes);