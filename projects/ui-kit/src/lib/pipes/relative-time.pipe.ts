import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'bkRelativeTime' })
export class RelativeTimePipe implements PipeTransform {
  transform(value: string | Date): string {
    const then = new Date(value).getTime();
    const days = Math.floor((Date.now() - then) / 86400000);
    if (days <= 0) {
      return 'Today';
    }
    return days === 1 ? 'Yesterday' : days + ' days ago';
  }
}
