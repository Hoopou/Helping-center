import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsViewComponent } from './views/settings-view/settings-view.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { LookupModule } from '../../shared/modules/lookup/lookup.module';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { SharedModule } from '../../shared/shared.module';
import { PipeUtilsModule } from '../../shared/modules/pipe-utils/pipe-utils.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxMaskModule } from 'ngx-mask';
import { TablesViewComponent } from './views/tables-view/tables-view.component';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    NgSelectModule,
    LookupModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    SharedModule,
    PipeUtilsModule,
    BsDropdownModule.forRoot(),
    NgxMaskModule.forRoot()
  ],
  declarations: [SettingsViewComponent, TablesViewComponent]
})
export class SettingsModule { }
