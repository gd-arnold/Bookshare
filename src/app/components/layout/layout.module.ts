import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { SearchEngineComponent } from '../shared/search-engine/search-engine.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [NavigationComponent]
})
export class LayoutModule { }
