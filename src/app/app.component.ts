import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './shared/services/language.service';
import { ThemeService } from './shared/services/theme.service';
import { BreakpointService } from './shared/services/breakpoint.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: LOCALE_ID,
      deps: [LanguageService],
      useFactory: (languageService: LanguageService) =>
        languageService.getLanguage(),
    },
    {
      provide: APP_BASE_HREF,
      deps: [LanguageService],
      useFactory: (languageService: LanguageService) =>
        languageService.getbaseHref(),
    },
  ],
})
export class AppComponent implements OnInit {
  title = 'Baam';
  constructor(
    private themeService: ThemeService,
    private breakpointService: BreakpointService
  ) {}

  ngOnInit(): void {
    this.themeService.setCurrentTheme();
    this.themeService.setCurrentColorScheme();
  }
}
