import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../layout/layout.module';
import { SupportComponent } from './support/support.component';



@NgModule({
  declarations: [UserProfileComponent, SupportComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    LayoutModule
  ]
})
export class UserModule { }
