import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'bkTruncate' })
export class TruncatePipe implements PipeTransform {
  transform(value: string, max = 40): string {
    return value && value.length > max ? value.slice(0, max - 1) + '\u2026' : value;
  }
}
