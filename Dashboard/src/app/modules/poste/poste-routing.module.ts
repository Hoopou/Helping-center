import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PosteComponent } from './views/poste/poste.component';
import { PosteViewComponent } from './components/poste-view/poste-view.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Postes'
    },
    component: PosteComponent
  },
  {
    path: ':id',
    data: {
      title: 'Poste'
    },
    component: PosteViewComponent
  },
  {
    path: '**',
    data: {
      title: 'Poste'
    },
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosteRoutingModule { }
