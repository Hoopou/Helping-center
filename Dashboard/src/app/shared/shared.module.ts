import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { MultiPictureManagerComponent } from './components/multi-picture-manager/multi-picture-manager.component';
import { TwoDigitDecimaNumberDirective } from './directives/two-digit-decimal.directive';

@NgModule({
  declarations: [
    LoadingComponent,
    MultiPictureManagerComponent,
    TwoDigitDecimaNumberDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LoadingComponent,
    MultiPictureManagerComponent,
    TwoDigitDecimaNumberDirective
  ]
})
export class SharedModule { }
