import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { translations } from 'src/assets/translations/translations';

@Pipe({
  name: 'translate',
  standalone: true,
})
export class TranslatePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string) {}
  translations = translations;
  transform(value: any, ...args: string[]) {
    console.log(args);
    return translations[this.locale][args[0]][args[1]];
  }
}
