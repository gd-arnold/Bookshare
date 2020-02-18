import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { SearchEngineComponent } from '../shared/search-engine/search-engine.component';



@NgModule({
  declarations: [NavigationComponent, SearchEngineComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [NavigationComponent]
})
export class LayoutModule { }
