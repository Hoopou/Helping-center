import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeViewComponent } from './views/employes/employe.component';
import { EmployeModalComponent } from './components/employe-modal/employe-modal.component';
import { PlanFormationComponent } from './components/plan-formation/plan-formation.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Employes'
    },
      component: EmployeViewComponent,
      pathMatch: 'full'
  },
  {
    path: ':id',
    component: EmployeModalComponent,
  },
  {
    path: ':id/plan',
    component: PlanFormationComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: EmployeViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployesRoutingModule { }
