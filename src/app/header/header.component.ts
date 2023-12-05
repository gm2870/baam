import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

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
}
