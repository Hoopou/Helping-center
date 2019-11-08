import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppConnectionRoutingModule } from './app-connection-routing.module';
import { AppConnectionViewComponent } from './views/app-connection-view/app-connection-view.component';

@NgModule({
  declarations: [AppConnectionViewComponent],
  imports: [
    CommonModule,
    AppConnectionRoutingModule
  ]
})
export class AppConnectionModule { }
