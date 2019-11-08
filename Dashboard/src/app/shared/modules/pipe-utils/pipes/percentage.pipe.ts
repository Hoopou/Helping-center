import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentage'
})
export class PercentagePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(isNaN(value) || value == null) return "";
    
    return value.toFixed(2) + " %";
  }

}
