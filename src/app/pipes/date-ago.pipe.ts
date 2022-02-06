import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgo',
})
export class DateAgoPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29) {
        return 'Az önce';
      } else if (seconds < 60) {
        return Math.floor(seconds) + ' saniye önce';
      } else if (seconds < 3600) {
        return Math.floor(seconds / 60) + ' dakika önce';
      } else if (seconds < 86400) {
        return Math.floor(seconds / 3600) + ' saat önce';
      } else if (seconds < 604800) {
        return Math.floor(seconds / 86400) + ' gün önce';
      } else if (seconds < 2592000) {
        return Math.floor(seconds / 604800) + ' hafta önce';
      } else if (seconds < 31536000) {
        return Math.floor(seconds / 2592000) + ' ay önce';
      } else {
        return Math.floor(seconds / 31536000) + ' yıl önce';
      }
    }
    return value;
  }
}
