import { Component, Input, OnChanges } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LanguageService } from '../../services/language.service';
import { translations } from 'src/locale/translations';

@Component({
  selector: 'baam-error-message',
  standalone: true,
  imports: [MatFormFieldModule],
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent {
  @Input() messageId = '';
  locale = 'fa';
  translations = translations;

  constructor(private langService: LanguageService) {
    this.locale = this.langService.lang;
  }
}
