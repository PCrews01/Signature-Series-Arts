import { Pipe, PipeTransform } from '@angular/core';
import { LowerCasePipe } from '@angular/common';

@Pipe({
  name: 'showName'
})
export class ShowNamePipe implements PipeTransform {

  transform(value: any, showname: any): any {
    showname = value.replace(RegExp(' ', 'g'), '_');
    return showname;
  }

}
