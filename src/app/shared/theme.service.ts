import { Inject, Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
export const themes: Theme[] = [
  {
    name: 'DEFAULT',
    label: 'پیش فرض',
    avatar:
      'background: linear-gradient(90deg, rgb(248, 155, 23) 50%, rgb(44, 146, 242) 50%);',
  },
  {
    name: 'SPRING',
    label: 'بهاری',
    avatar:
      'background: linear-gradient(90deg, rgb(51, 146, 214) 50%, rgb(234, 54, 108) 50%);',
  },
  {
    name: 'AUTUMN',
    label: 'پاییزی',
    avatar:
      'background: linear-gradient(90deg, rgb(83, 137, 156) 50%, rgb(248, 95, 49) 50%);',
  },
];
export type ColorScheme = 'dark' | 'light';
export type ThemeType = 'DEFAULT' | 'SPRING' | 'AUTUMN';
export type Theme = {
  name: ThemeType;
  label: string;
  avatar: string;
};

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private colorScheme = signal<ColorScheme>('light');
  theme = signal<ThemeType>(themes[0].name);

  constructor(@Inject(DOCUMENT) private document: Document) {}

  setDefaultTheme() {
    this.document.body.classList.add('theme--default');
    this.theme.set(JSON.parse(themes[0].name));
  }

  setColorScheme(scheme: ColorScheme) {
    this.colorScheme.set(scheme);
    localStorage.setItem('preferred-color-scheme', scheme);
  }

  setCurrentTheme() {
    const theme = localStorage.getItem('preferred-color-palette');
    if (theme) {
      this.document.body.classList.add(JSON.parse(theme));
      this.theme.set(JSON.parse(theme).split('--')[1].toUpperCase());
    } else {
      this.setDefaultTheme();
    }
  }

  setCurrentColorScheme() {
    const scheme = localStorage.getItem('preferred-color-scheme');
    if (scheme) {
      this.document.body.classList.add(`color-scheme-${scheme}`);
      this.colorScheme.set(scheme as ColorScheme);
    } else {
      this.document.body.classList.add('color-scheme-light');
      this.colorScheme.set('light');
    }
  }

  setThemeClass(theme: ThemeType) {
    this.document.body.classList.add(`theme--${theme.toLowerCase()}`);
  }

  removeThemeClass(theme: ThemeType) {
    this.document.body.classList.remove(`theme--${theme.toLowerCase()}`);
  }

  saveThemeToStorage(theme: ThemeType) {
    localStorage.setItem(
      'preferred-color-palette',
      JSON.stringify(`theme--${theme.toLocaleLowerCase()}`)
    );
  }

  getThemeFromStorage() {
    const theme = localStorage.getItem('preferred-color-palette');
    if (!theme) return;
    return JSON.parse(theme);
  }

  changeTheme(val: ThemeType) {
    this.removeThemeClass(this.theme());
    const selectedTheme = themes.find((t) => t.name === val) as Theme;
    this.theme.set(selectedTheme.name);
    this.setThemeClass(this.theme());
    this.saveThemeToStorage(this.theme());
  }
  isDark(): boolean {
    return this.colorScheme() === 'dark';
  }

  setDarkMode() {
    this.document.body.classList.remove('color-scheme-light');
    this.document.body.classList.add('color-scheme-dark');
    this.colorScheme.set('dark');
    localStorage.setItem('preferred-color-scheme', 'dark');
  }
  setLightMode() {
    this.document.body.classList.remove('color-scheme-dark');
    this.document.body.classList.add('color-scheme-light');
    this.colorScheme.set('light');

    localStorage.setItem('preferred-color-scheme', 'light');
  }
}
