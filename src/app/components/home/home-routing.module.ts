import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    HomepageComponent
  }
];

export const HomeRoutingModule = RouterModule.forChild(routes);
