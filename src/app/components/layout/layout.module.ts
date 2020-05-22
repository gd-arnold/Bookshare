import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NotificationsComponent } from './notifications/notifications.component';
import { LoaderComponent } from './loader/loader.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [NavigationComponent, NotificationsComponent, LoaderComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [NavigationComponent, LoaderComponent, FooterComponent]
})
export class LayoutModule { }
