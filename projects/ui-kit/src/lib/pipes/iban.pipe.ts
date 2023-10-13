import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'bkIban' })
export class IbanPipe implements PipeTransform {
  transform(value: string): string {
    return (value || '').replace(/(.{4})/g, '$1 ').trim();
  }
}
