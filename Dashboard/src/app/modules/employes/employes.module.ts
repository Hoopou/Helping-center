import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployesRoutingModule } from './employes-routing.module';
import { EmployeViewComponent } from './views/employes/employe.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { EmployeModalComponent } from './components/employe-modal/employe-modal.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PlanFormationComponent } from './components/plan-formation/plan-formation.component';

@NgModule({
  declarations: [EmployeViewComponent, EmployeModalComponent, EmployeModalComponent, PlanFormationComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    EmployesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
  ]
})
export class EmployesModule { }
