import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'bkSignedAmount' })
export class SignedAmountPipe implements PipeTransform {
  transform(value: number): string {
    const sign = value > 0 ? '+' : '';
    return sign + value.toFixed(2);
  }
}
