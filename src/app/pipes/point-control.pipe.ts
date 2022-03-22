import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pointControl',
})
export class PointControlPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    if (value[value.length - 1] == '.') {
      return value.slice(0, -1);
    }
    return value;
  }
}
