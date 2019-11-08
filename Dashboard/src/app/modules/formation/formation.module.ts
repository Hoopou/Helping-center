import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormationViewComponent } from './views/formation-view/formation-view.component';
import { FormationRoutingModule } from './formation-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { LookupModule } from '../../shared/modules/lookup/lookup.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { SharedModule } from '../../shared/shared.module';
import { PipeUtilsModule } from '../../shared/modules/pipe-utils/pipe-utils.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxMaskModule } from 'ngx-mask';
import { CustomDropdownModule } from '../../shared/modules/custom-dropdown/custom-dropdown.module';

@NgModule({
  imports: [
    CommonModule,
    FormationRoutingModule,
    FormsModule,
    NgSelectModule,
    LookupModule,
    CustomDropdownModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    SharedModule,
    PipeUtilsModule,
    BsDropdownModule.forRoot(),
    NgxMaskModule.forRoot()
  ],
  declarations: [FormationViewComponent]
})
export class FormationModule { }
