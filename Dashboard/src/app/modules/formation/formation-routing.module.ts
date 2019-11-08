import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormationViewComponent } from './views/formation-view/formation-view.component';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Formations'
    },
    children: [
      {
        path: '',
        component: FormationViewComponent,
      },
      {
        path: ':quotes',
        component: FormationViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormationRoutingModule { }
