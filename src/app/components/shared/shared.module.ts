import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchEngineComponent } from './search-engine/search-engine.component';



@NgModule({
  declarations: [SearchEngineComponent],
  imports: [
    CommonModule
  ],
  exports: [SearchEngineComponent]
})
export class SharedModule { }
