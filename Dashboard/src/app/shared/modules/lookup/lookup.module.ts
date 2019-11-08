import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LookupFieldComponent } from './components/lookup-field/lookup-field.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule
  ],
  declarations: [LookupFieldComponent],
  exports:[
    LookupFieldComponent
  ]
})
export class LookupModule { }
