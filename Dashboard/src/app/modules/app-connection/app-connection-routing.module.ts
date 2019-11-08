import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppConnectionViewComponent} from './views/app-connection-view/app-connection-view.component'

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Connected Apps'
    }
    ,
    children: [
      {
        path: '',
        component: AppConnectionViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppConnectionRoutingModule { }
