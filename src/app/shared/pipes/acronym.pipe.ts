import { Pipe, PipeTransform } from '@angular/core';
import { LowerCasePipe } from '@angular/common';

@Pipe({
  name: 'acronym'
})
export class AcronymPipe implements PipeTransform {
  transform(value: any, acronym: string): any {
    acronym = value.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '');
    return acronym.toLocaleUpperCase();
  }

}
