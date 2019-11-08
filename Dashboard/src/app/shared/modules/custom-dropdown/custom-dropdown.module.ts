import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDropdownComponent } from './components/custom-dropdown/custom-dropdown.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule
  ],
  declarations: [CustomDropdownComponent],
  exports:[
    CustomDropdownComponent
  ]
})
export class CustomDropdownModule { }
