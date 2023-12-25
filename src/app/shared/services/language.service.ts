import { Inject, Injectable, LOCALE_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  get lang() {
    return this.getLanguage() === 'fa-IR' ? 'fa' : 'en';
  }

  constructor() {}

  getLanguage() {
    const storageLang = localStorage.getItem('preferred-language');
    if (storageLang) {
      const lang = JSON.parse(storageLang);
      return lang;
    }
    return 'fa-IR';
  }

  getbaseHref() {
    return this.getLanguage() === 'fa-IR' ? 'fa' : 'en';
  }

  setLanguage(lang: 'en-US' | 'fa-IR') {
    localStorage.setItem('preferred-language', JSON.stringify(lang));
  }
}
