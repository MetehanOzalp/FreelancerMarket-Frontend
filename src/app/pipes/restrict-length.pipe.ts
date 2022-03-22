import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'restrictLength',
})
export class RestrictLengthPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    if (value.length > 48) {
      return value.slice(0, 48) + '...';
    }
    return value;
  }
}
