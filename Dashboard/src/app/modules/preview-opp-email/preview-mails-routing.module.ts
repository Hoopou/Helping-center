import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreviewEmailsViewComponent } from './views/preview-emails-view/preview-emails-view.component';

const routes: Routes = [
  {    
    path: ':oppid',
    component: PreviewEmailsViewComponent,
    data: {
      title: 'preview emails'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreviewMailsRoutingModule { }
