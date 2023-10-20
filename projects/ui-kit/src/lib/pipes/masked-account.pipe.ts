import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'bkMaskedAccount' })
export class MaskedAccountPipe implements PipeTransform {
  transform(value: string): string {
    return value ? '\u2022\u2022\u2022\u2022 ' + value.slice(-4) : '';
  }
}
