import { Pipe, PipeTransform } from '@angular/core';
import { LowerCasePipe } from '@angular/common';

@Pipe({
  name: 'showName'
})
export class ShowNamePipe implements PipeTransform {

  transform(value: string, showname: any): any {
    showname = value.toString().replace(RegExp(' ', 'g'), '_');
    return showname;
  }

}
