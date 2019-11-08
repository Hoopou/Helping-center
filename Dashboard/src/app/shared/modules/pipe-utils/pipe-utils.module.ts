import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashPipe } from './pipes/cash.pipe';
import { PercentagePipe } from './pipes/percentage.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CashPipe, PercentagePipe],
  exports:[CashPipe, PercentagePipe]
})
export class PipeUtilsModule { }
