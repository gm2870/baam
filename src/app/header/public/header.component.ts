import { Component, DestroyRef, OnInit, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../shared/services/language.service';
import { Router } from '@angular/router';
import {
  ThemeService,
  ThemeType,
  themes,
} from 'src/app/shared/services/theme.service';
import { BreakpointService } from 'src/app/shared/services/breakpoint.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from 'src/app/shared/pipes/translate.pipe';

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
    TranslatePipe,
  ],
})
export class HeaderComponent implements OnInit {
  languages = [
    { locale: 'fa-IR', label: 'فارسی' },
    { locale: 'en-US', label: 'انگلیسی' },
  ];
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  themeName!: ThemeType;
  lang: 'fa-IR' | 'en-US' = 'fa-IR';
  themes = themes;
  darkMode = false;
  isMobile = false;
  menuOpen = false;
  constructor(
    private langService: LanguageService,
    private router: Router,
    private themeService: ThemeService,
    private breakpointService: BreakpointService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.lang = this.langService.getLanguage();
    this.darkMode = this.themeService.isDark();
    this.themeName = this.themeService.theme();
    this.breakpointService.isMobile$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isMobile) => (this.isMobile = isMobile));
  }

  onThemeChange(e: MatSelectionListChange) {
    if (!e.source._value) return;
    const val = e.source._value[0] as ThemeType;
    this.themeName = val;
    this.trigger.closeMenu();
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
    location.href = `/${this.langService.getbaseHref()}${this.router.url}`;
  }
}
