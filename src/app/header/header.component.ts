import { Component, signal, Inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatExpansionModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatListModule,
  ],
})
export class HeaderComponent {
  themes = [
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

  languages = [
    { locale: 'fa', label: 'فارسی' },
    { locale: 'en', label: 'انگلیسی' },
  ];

  theme = signal<string>('DEFAULT');

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.setThemeClass(this.theme());
    this.saveThemeToStorage(this.theme());
  }

  onThemeChange(e: MatSelectionListChange) {
    if (!e.source._value) return;
    const val = e.source._value[0];
    this.removeThemeClass(this.theme());
    this.theme.set(val);
    this.setThemeClass(this.theme());
    this.saveThemeToStorage(this.theme());
  }

  setThemeClass(theme: string) {
    this.document.body.classList.add(`theme--${theme.toLowerCase()}`);
  }

  removeThemeClass(theme: string) {
    this.document.body.classList.remove(`theme--${theme.toLowerCase()}`);
  }

  saveThemeToStorage(theme: string) {
    window.localStorage.setItem(
      'preferred-color-palette',
      JSON.stringify(`theme--${theme.toLocaleLowerCase()}`)
    );
  }

  darkModeChange(event: MatSlideToggleChange) {
    const isDark = event.checked;
    if (isDark) {
      this.document.body.classList.add('dark-scheme');
    } else {
      this.document.body.classList.remove('dark-scheme');
    }
  }
}
