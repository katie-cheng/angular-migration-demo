import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'bkTransactionStatus' })
export class TransactionStatusPipe implements PipeTransform {
  transform(value: string): string {
    const map: Record<string, string> = { P: 'Pending', S: 'Settled', F: 'Failed', R: 'Returned' };
    return map[value] || 'Unknown';
  }
}
