import { Component, OnInit } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../shared/language.service';
import { Router } from '@angular/router';
import { ThemeService, ThemeType, themes } from 'src/app/shared/theme.service';
import { BreakpointService } from 'src/app/shared/breakpoint.service';

@Component({
  selector: 'baam-public-header',
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
export class HeaderComponent implements OnInit {
  languages = [
    { locale: 'fa-IR', label: 'فارسی' },
    { locale: 'en-US', label: 'انگلیسی' },
  ];

  themeName!: ThemeType;
  lang: 'fa-IR' | 'en-US' = 'fa-IR';
  themes = themes;
  darkMode = false;
  isMobile = false;

  constructor(
    private langService: LanguageService,
    private router: Router,
    private themeService: ThemeService,
    private breakpointService: BreakpointService
  ) {}

  ngOnInit(): void {
    this.lang = this.langService.getLanguage();
    this.darkMode = this.themeService.isDark();
    this.themeName = this.themeService.theme();
    this.breakpointService.isMobile$.subscribe(
      (isMobile) => (this.isMobile = isMobile)
    );
  }

  onThemeChange(e: MatSelectionListChange) {
    if (!e.source._value) return;
    const val = e.source._value[0] as ThemeType;
    this.themeService.changeTheme(val);
  }

  saveThemeToStorage(theme: string) {
    localStorage.setItem(
      'preferred-color-palette',
      JSON.stringify(`theme--${theme.toLocaleLowerCase()}`)
    );
  }

  darkModeChange(event: MatSlideToggleChange) {
    const isDark = event.checked;
    if (isDark) {
      this.themeService.setDarkMode();
    } else {
      this.themeService.setLightMode();
    }
  }

  onLangChange(event: MatSelectionListChange) {
    if (!event.source._value) return;

    const val = event.source._value[0] as 'en-US' | 'fa-IR';
    this.langService.setLanguage(val);
    this.router.navigate([
      `/${this.langService.getbaseHref()}/${this.router.url}`,
    ]);
  }
}
