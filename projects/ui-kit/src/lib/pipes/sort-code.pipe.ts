import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'bkSortCode' })
export class SortCodePipe implements PipeTransform {
  transform(value: string): string {
    return (value || '').replace(/(\d{2})(?=\d)/g, '$1-');
  }
}
